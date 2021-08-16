import { gql } from '@apollo/client';

export const newMeasurementSubscription = gql`
  subscription {
    newMeasurement {
      metric,
      at,
      value,
      unit,
    }
  }
`;
