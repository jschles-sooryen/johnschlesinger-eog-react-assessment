import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { Container } from '@material-ui/core';
import { toast } from 'react-toastify';

import MetricsSelect from './components/MetricsSelect';
import MetricRealTimeInfo from './components/MetricRealTimeInfo';
import MetricsLineChart from './components/MetricsLineChart';
import { getMetricsQuery } from '../../graphql/queries';
import LoadingIndicator from '../../components/LoadingIndicator';

import { GetMetricsResponse } from './types';

const Metrics: FC = () => {
  const { loading, error, data } = useQuery<GetMetricsResponse>(getMetricsQuery);

  if (loading) return <LoadingIndicator />;
  if (error) {
    toast(error?.message || 'Error: Unable to retrieve metrics.');
  }

  const metricsOptions = data?.getMetrics || [];

  return (
    <Container>
      <MetricsSelect options={metricsOptions} />
      <MetricRealTimeInfo />
      <MetricsLineChart />
    </Container>
  );
};

export default Metrics;
