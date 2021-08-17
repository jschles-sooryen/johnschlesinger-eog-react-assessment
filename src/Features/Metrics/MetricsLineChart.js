import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper, Typography, makeStyles, Grid, Button,
} from '@material-ui/core';
import { useApolloClient } from '@apollo/client';
import { subMinutes } from 'date-fns';
import {
  CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip,
} from 'recharts';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getMeasurementsQuery } from '../../graphql/queries';
import { setHistoricalMeasurement } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(2.5)}px ${theme.spacing(1)}px`,
  },
  flexContainer: {
    marginBottom: theme.spacing(2),
  },
}));

// Colors taken from https://react.eogresources.com/dashboard
const metricChartLineColors = {
  casingPressure: 'rgb(88, 24, 69)',
  injValveOpen: 'rgb(199, 0, 57)',
  tubingPressure: 'rgb(255, 87, 51)',
  flareTemp: 'rgb(255, 195, 0)',
  oilTemp: 'rgb(144, 12, 63)',
  waterTemp: 'rgb(218, 247, 166)',
};

const MetricsLineChart = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { selectedMetrics } = useSelector((state) => state.metrics);
  const historicalData = useSelector((state) => state.measurements.historical);
  const client = useApolloClient();
  const lastThirtyMinutes = subMinutes(new Date(), 30).valueOf();
  const queryVariables = selectedMetrics.map((m) => ({ metricName: m, after: lastThirtyMinutes }));

  const getMeasurements = async () => {
    setLoading(true);

    const response = await client.query({
      query: getMeasurementsQuery,
      variables: {
        input: [...queryVariables],
      },
    });

    if (response.data) {
      dispatch(setHistoricalMeasurement(response.data.getMultipleMeasurements));
    }

    setLoading(false);
  };

  const getMeasurementChartData = () => {
    const allMeasurementData = [];

    if (historicalData.length) {
      historicalData[0].measurements.forEach((meas) => {
        allMeasurementData.push({
          at: meas.at,
          [meas.metric]: meas.value,
        });
      });

      /*
       When more than one metric is selected, we need to take each instance of measurement
       data of those other metrics and add them to the existing allMeasurement data
       entries based on the timestamp. This allows us to pair multiple metrics with the
       same times on the x-axis.
      */
      allMeasurementData.forEach((meas) => {
        historicalData.forEach((metric) => {
          if (metric.metric !== historicalData[0].metric) {
            const otherMetric = metric.measurements.find(m => m.at === meas.at);
            meas[metric.metric] = otherMetric.value;
          }
        });
      });
    }

    return allMeasurementData;
  };

  useEffect(() => {
    if (selectedMetrics.length) {
      getMeasurements();
    }
  }, [selectedMetrics]);

  if (!selectedMetrics.length) return null;

  return (
    <div>
      <Grid
        classes={{ root: classes.flexContainer }}
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <Typography variant="h6">Last 30 Minutes:</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={getMeasurements}
          >
            Refresh
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <Paper elevation={2} classes={{ root: classes.paperRoot }}>
          <ResponsiveContainer height={600}>
            <LineChart
              data={getMeasurementChartData()}
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}
            >
              <XAxis dataKey="at" interval={225} />
              <CartesianGrid stroke="#f5f5f5" />
              <Tooltip filterNull={false} />
              {historicalData.map((m) => (
                <YAxis
                  key={`y-${m.metric}`}
                  yAxisId={m.metric}
                  label={{
                    value: m.measurements[0].unit,
                    position: 'insideTopLeft',
                    angle: -90,
                  }}
                />
              ))}
              {historicalData.map((m) => (
                <Line
                  key={`x-${m.metric}`}
                  type="monotone"
                  dataKey={m.metric}
                  yAxisId={m.metric}
                  stroke={metricChartLineColors[m.metric]}
                  dot={false}
                />
              ))}
              <Legend verticalAlign="bottom" height={5} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      )}
    </div>
  );
};

export default MetricsLineChart;
