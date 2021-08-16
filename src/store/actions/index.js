import { ADD_SELECTED_METRIC, REMOVE_SELECTED_METRIC } from './types';

export const addSelectedMetric = (metric) => ({ type: ADD_SELECTED_METRIC, payload: metric });
export const removeSelectedMetric = (metric) => ({ type: REMOVE_SELECTED_METRIC, payload: metric });
