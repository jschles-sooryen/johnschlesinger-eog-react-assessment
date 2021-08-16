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
  cardRoot: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
          classes={{ root: classes.cardRoot }}
        >
          <Card>
            <CardHeader title={`${metric}:`} />
            <CardContent>
              <Typography>{value} {unit}</Typography>
              <Typography>{date}</Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });

  return (
    <Grid
      container
      classes={{ root: classes.root }}
    >
      {selectedMetricRealTimeInfo}
    </Grid>
  );
};

export default MetricRealTimeInfo;
