import { gql } from '@apollo/client';

export const getMetricsQuery = gql`
  query {
    getMetrics
  }
`;

export const getMeasurementsQuery = gql`
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric,
      measurements {
        metric,
        at,
        value,
        unit,
      }
    }
  }
`;
