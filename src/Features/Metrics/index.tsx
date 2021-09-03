import React, { FC } from 'react';
import { Container } from '@material-ui/core';

import MetricsSelect from './components/MetricsSelect';
import MetricRealTimeInfo from './components/MetricRealTimeInfo';
import MetricsLineChart from './components/MetricsLineChart';

const Metrics: FC = () => (
  <Container>
    <MetricsSelect />
    <MetricRealTimeInfo />
    <MetricsLineChart />
  </Container>
);

export default Metrics;
