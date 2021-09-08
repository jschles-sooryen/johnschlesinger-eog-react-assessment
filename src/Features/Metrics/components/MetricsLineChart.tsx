import React, { useState, useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper, Typography, makeStyles, Grid, useMediaQuery, Theme,
} from '@material-ui/core';
import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import { subMinutes } from 'date-fns';
import {
  CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip,
} from 'recharts';
import { toast } from 'react-toastify';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { getMeasurementsQuery } from '../../../graphql/queries';
import { setHistoricalMeasurement } from '../../../store/actions';

import { RootState } from '../../../store';
import {
  Measurement,
  ChartMeasurement,
  GetMultipleMeasurementsResponse,
  GetMultipleMeasurementsData,
  SelectedMetricsProps,
} from '../types';

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(2.5)}px ${theme.spacing(1)}px`,
  },
  flexContainer: {
    marginBottom: theme.spacing(2),
  },
}));

// Colors taken from https://react.eogresources.com/dashboard
const metricChartLineColors: { [key: string]: any } = {
  casingPressure: 'rgb(88, 24, 69)',
  injValveOpen: 'rgb(199, 0, 57)',
  tubingPressure: 'rgb(255, 87, 51)',
  flareTemp: 'rgb(255, 195, 0)',
  oilTemp: 'rgb(144, 12, 63)',
  waterTemp: 'rgb(218, 247, 166)',
};

const historicalDataState = (state: RootState) => state.historical.measurements;

const chartDataSelector = (state: RootState): ChartMeasurement[] => {
  const historicalData = state.historical.measurements;
  let formattedChartData: ChartMeasurement[] = [];

  if (historicalData.length) {
    formattedChartData = historicalData[0].measurements.map((meas: Measurement) => ({
      at: meas.at,
      [meas.metric]: meas.value,
    }));

    /*
     When more than one metric is selected, we need to take each instance of measurement
     data of those other metrics and add them to the existing allMeasurement data
     entries based on the timestamp. This allows us to pair multiple metrics with the
     same times on the x-axis.
    */
    formattedChartData.forEach((meas: ChartMeasurement) => {
      historicalData.forEach((metric: GetMultipleMeasurementsData) => {
        if (metric.metric !== historicalData[0].metric) {
          const otherMetric = metric.measurements.find((m: Measurement) => m.at === meas.at)!;
          meas[metric.metric] = otherMetric.value;
        }
      });
    });
  }

  return formattedChartData;
};

const MetricsLineChart: FC<SelectedMetricsProps> = (
  { selectedMetrics }: SelectedMetricsProps,
) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState({});
  const historicalData = useSelector(historicalDataState);
  const chartData = useSelector(chartDataSelector);
  const client = useApolloClient();
  const lastThirtyMinutes = subMinutes(new Date(), 30).valueOf();
  const queryVariables = selectedMetrics.map((m) => ({ metricName: m, after: lastThirtyMinutes }));

  const getMeasurements = async () => {
    if (!queryVariables.length) return;

    setLoading(true);

    const getErrorMessage = (error: Error) => toast(error?.message || 'Error: Failed to retrieve metric historical data.');

    if (Object.keys(subscription).length) {
      (subscription as ZenObservable.Subscription).unsubscribe();
    }

    try {
      const observableQuery = await client.watchQuery({
        query: getMeasurementsQuery,
        variables: {
          input: [...queryVariables],
        },
        pollInterval: 8000,
      });

      const querySubscription = await observableQuery.subscribe({
        next: ({ data }: ApolloQueryResult<GetMultipleMeasurementsResponse>) => {
          if (data) {
            setSubscription(querySubscription);
            dispatch(setHistoricalMeasurement(data.getMultipleMeasurements));
          }
        },
        error: (e) => {
          getErrorMessage(e);
        },
      });
    } catch (e: any) {
      getErrorMessage(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (selectedMetrics.length) {
      getMeasurements();
    }
  }, [selectedMetrics]);

  if (!selectedMetrics.length) return null;

  const chartMargin = isMobile ? 5 : 20;

  return (
    <div>
      <Grid classes={{ root: classes.flexContainer }} container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h6">Last 30 Minutes:</Typography>
        </Grid>
      </Grid>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <Paper elevation={2} classes={{ root: classes.paperRoot }}>
          <ResponsiveContainer height={600}>
            <LineChart
              data={chartData}
              margin={{
                top: chartMargin,
                right: chartMargin,
                bottom: chartMargin,
                left: chartMargin,
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
