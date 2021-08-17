import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSubscription } from '@apollo/client';
import {
  Card, CardContent, Grid, LinearProgress, Typography, makeStyles,
} from '@material-ui/core';
import { format } from 'date-fns';

import CardHeader from '../../components/CardHeader';
import { newMeasurementSubscription } from '../../graphql/subscriptions';
import { setRealTimeMeasurement } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  gridRoot: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  cardTitle: {
    fontSize: 16,
  },
}));

const MetricRealTimeInfo = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    data, error, loading,
  } = useSubscription(newMeasurementSubscription);
  const { metrics, measurements } = useSelector((state) => state);
  const { selectedMetrics } = metrics;
  const realTimeMeasurements = measurements.realTime;

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  // Update store when new subscription data is received
  dispatch(setRealTimeMeasurement(data.newMeasurement));

  const selectedMetricRealTimeInfo = Object.keys(realTimeMeasurements)
    .filter((metric) => selectedMetrics.includes(metric))
    .map((result) => {
      const {
        metric, at, unit, value,
      } = realTimeMeasurements[result];

      const date = format(new Date(at), "MMMM do yyyy '@' h:mm a");

      return (
        <Grid
          item
          key={metric}
          xs={4}
        >
          <Card>
            <CardHeader
              title={`${metric}:`}
              classes={{ title: classes.cardTitle }}
            />
            <CardContent>
              <Typography>{value} {unit}</Typography>
              <Typography>{date}</Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });

  return (
    <div className={classes.root}>
      <Typography variant="h6">Real Time Data:</Typography>
      <Grid
        container
        classes={{ root: classes.gridRoot }}
        spacing={2}
      >
        {selectedMetricRealTimeInfo}
      </Grid>
    </div>
  );
};

export default MetricRealTimeInfo;
