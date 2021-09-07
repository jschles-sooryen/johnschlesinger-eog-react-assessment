import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

import MetricsSelect from './components/MetricsSelect';
import MetricRealTimeInfo from './components/MetricRealTimeInfo';
import MetricsLineChart from './components/MetricsLineChart';
import { RootState } from '../../store';

const metricsState = (state: RootState) => state.metrics;

const Metrics: FC = () => {
  const { selectedMetrics } = useSelector(metricsState);
  return (
    <Container>
      <MetricsSelect />
      {!!selectedMetrics.length && (
        <>
          <MetricRealTimeInfo />
          <MetricsLineChart />
        </>
      )}
    </Container>
  );
};

export default Metrics;
