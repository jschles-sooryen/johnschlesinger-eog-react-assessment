import React from 'react';
import { useQuery } from '@apollo/client';
import { Container } from '@material-ui/core';
import { toast } from 'react-toastify';

import MetricsSelect from './MetricsSelect';
import MetricRealTimeInfo from './MetricRealTimeInfo';
import MetricsLineChart from './MetricsLineChart';
import { getMetricsQuery } from '../../graphql/queries';
import LoadingIndicator from '../../components/LoadingIndicator';

const Metrics = () => {
  const { loading, error, data } = useQuery(getMetricsQuery);

  if (loading) return <LoadingIndicator />;
  if (error) {
    toast(error?.message || 'Error: Unable to retrieve metrics.');
  }

  const metricsOptions = data?.getMetrics;

  return (
    <Container>
      <MetricsSelect options={metricsOptions} />
      <MetricRealTimeInfo />
      <MetricsLineChart />
    </Container>
  );
};

export default Metrics;
