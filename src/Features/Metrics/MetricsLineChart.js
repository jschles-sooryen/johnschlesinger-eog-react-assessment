import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {
//   LineChart, Line, CartesianGrid, XAxis, YAxis,
// } from 'recharts';
import { useApolloClient } from '@apollo/client';
import { subMinutes } from 'date-fns';
import { getMeasurementsQuery } from '../../graphql/queries';
import { setHistoricalMeasurement } from '../../store/actions';

const MetricsLineChart = () => {
  const dispatch = useDispatch();
  const { selectedMetrics } = useSelector((state) => state.metrics);
  const client = useApolloClient();
  const lastThirtyMinutes = subMinutes(new Date(), 30).valueOf();
  const queryVariables = selectedMetrics.map((m) => ({ metricName: m, after: lastThirtyMinutes }));

  const getMeasurements = async () => {
    const response = await client.query({
      query: getMeasurementsQuery,
      variables: {
        input: [...queryVariables],
      },
    });

    if (response.data) {
      dispatch(setHistoricalMeasurement(response.data.getMultipleMeasurements));
    }
  };

  useEffect(() => {
    if (selectedMetrics.length) {
      getMeasurements();
    }
  }, [selectedMetrics]);

  if (!selectedMetrics.length) return null;

  return <div>Test</div>;
};

export default MetricsLineChart;
