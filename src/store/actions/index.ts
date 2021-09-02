import {
  ADD_SELECTED_METRIC,
  REMOVE_SELECTED_METRIC,
  SET_REAL_TIME_MEASUREMENT,
  SET_HISTORICAL_MEASUREMENT,
} from './types';

import { Measurement, GetMultipleMeasurementsData } from '../../Features/Metrics/types';

export const addSelectedMetric = (metric: string) => ({
  type: ADD_SELECTED_METRIC, payload: metric,
});

export const removeSelectedMetric = (metric: string) => ({
  type: REMOVE_SELECTED_METRIC, payload: metric,
});

export const setRealTimeMeasurement = (data: Measurement) => ({
  type: SET_REAL_TIME_MEASUREMENT, payload: data,
});

export const setHistoricalMeasurement = (data: GetMultipleMeasurementsData) => ({
  type: SET_HISTORICAL_MEASUREMENT, payload: data,
});
