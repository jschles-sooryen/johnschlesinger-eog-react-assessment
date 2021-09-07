import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useSubscription } from '@apollo/client';
import {
  Card, CardContent, Grid, Typography, makeStyles, useMediaQuery, Theme,
} from '@material-ui/core';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

import CardHeader from '../../../components/CardHeader';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { newMeasurementSubscription } from '../../../graphql/subscriptions';
import { setRealTimeMeasurement } from '../../../store/actions';

import { Measurement, MetricsRealTimeInfoProps } from '../types';

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

const MetricRealTimeInfo: FC<MetricsRealTimeInfoProps> = (
  { realTimeMeasurements, selectedMetrics }: MetricsRealTimeInfoProps,
) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const {
    data, error, loading,
  } = useSubscription(newMeasurementSubscription);

  if (loading) return <LoadingIndicator />;
  if (error) {
    toast(error?.message || 'Error: Unable to retrieve real time metric data.');
    return null;
  }

  // Update store when new subscription data is received
  dispatch(setRealTimeMeasurement(data.newMeasurement));

  const selectedMetricRealTimeInfo = Object.keys(realTimeMeasurements)
    .filter((metric) => selectedMetrics.includes(metric))
    .map((result) => {
      const {
        metric, at, unit, value,
      } = realTimeMeasurements[result] as Measurement;

      const date = format(new Date(at), "MMMM do yyyy '@' h:mm a");

      return (
        <Grid
          item
          key={metric}
          xs={isMobile ? 12 : 4}
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
      {!!selectedMetricRealTimeInfo.length && (
        <Typography variant="h6">Real Time Data:</Typography>
      )}
      <Grid
        container
        direction={isMobile ? 'column' : 'row'}
        classes={{ root: classes.gridRoot }}
        spacing={2}
      >
        {selectedMetricRealTimeInfo}
      </Grid>
    </div>
  );
};

export default MetricRealTimeInfo;
