import React from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { LinearProgress, Typography, Container } from '@material-ui/core';

import MetricsSelect from './MetricsSelect';
import { getMetricsQuery } from '../../graphql/queries';
import { newMeasurementSubscription } from '../../graphql/subscriptions';

const Metrics = () => {
  const { loading, error, data } = useQuery(getMetricsQuery);
  const {
    data: subData, error: subError, loading: subLoading,
  } = useSubscription(newMeasurementSubscription);

  if (loading || subLoading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (subError) return <Typography color="error">{subError}</Typography>;

  const metricsOptions = data?.getMetrics;

  return (
    <Container>
      <MetricsSelect options={metricsOptions} />
    </Container>
  );
};

export default Metrics;
