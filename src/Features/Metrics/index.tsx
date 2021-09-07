import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useQuery } from '@apollo/client';
import { Container } from '@material-ui/core';

import MetricsSelect from './components/MetricsSelect';
import MetricRealTimeInfo from './components/MetricRealTimeInfo';
import MetricsLineChart from './components/MetricsLineChart';
import LoadingIndicator from '../../components/LoadingIndicator';
import { RootState } from '../../store';

import { getMetricsQuery } from '../../graphql/queries';
import { GetMetricsResponse } from './types';

const metricsState = (state: RootState) => state.metrics;
const realTimeState = (state: RootState) => state.realTime;

const Metrics: FC = () => {
  const { selectedMetrics } = useSelector(metricsState);
  const realTimeMeasurements = useSelector(realTimeState);
  const { loading, error, data } = useQuery<GetMetricsResponse>(getMetricsQuery);

  if (loading) return <LoadingIndicator />;
  if (error) {
    toast(error?.message || 'Error: Unable to retrieve metrics.');
  }

  const options = data?.getMetrics || [];

  return (
    <Container>
      <MetricsSelect options={options} selectedMetrics={selectedMetrics} />
      {!!selectedMetrics.length && (
        <>
          <MetricRealTimeInfo
            selectedMetrics={selectedMetrics}
            realTimeMeasurements={realTimeMeasurements}
          />
          <MetricsLineChart />
        </>
      )}
    </Container>
  );
};

export default Metrics;
