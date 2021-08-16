import React from 'react';
import { useQuery } from '@apollo/client';
import { LinearProgress, Typography, Container } from '@material-ui/core';

import MetricsSelect from './MetricsSelect';
import MetricRealTimeInfo from './MetricRealTimeInfo';
import { getMetricsQuery } from '../../graphql/queries';

const Metrics = () => {
  const { loading, error, data } = useQuery(getMetricsQuery);

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const metricsOptions = data?.getMetrics;

  return (
    <Container>
      <MetricsSelect options={metricsOptions} />
      <MetricRealTimeInfo />
    </Container>
  );
};

export default Metrics;
