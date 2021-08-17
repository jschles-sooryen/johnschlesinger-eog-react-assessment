import {
  ADD_SELECTED_METRIC,
  REMOVE_SELECTED_METRIC,
  SET_REAL_TIME_MEASUREMENT,
  SET_HISTORICAL_MEASUREMENT,
} from './types';

export const addSelectedMetric = (metric) => ({
  type: ADD_SELECTED_METRIC, payload: metric,
});

export const removeSelectedMetric = (metric) => ({
  type: REMOVE_SELECTED_METRIC, payload: metric,
});

export const setRealTimeMeasurement = (data) => ({
  type: SET_REAL_TIME_MEASUREMENT, payload: data,
});

export const setHistoricalMeasurement = (data) => ({
  type: SET_HISTORICAL_MEASUREMENT, payload: data,
});
