import { produce, Draft } from 'immer';
import { AnyAction } from 'redux';
import { ADD_SELECTED_METRIC, REMOVE_SELECTED_METRIC } from '../actions/types';

type MetricsState = {
  selectedMetrics: string[];
};

const initialState = {
  selectedMetrics: [],
};

const metricsReducer = <T extends MetricsState>(draft: Draft<T>, action: AnyAction) => {
  switch (action.type) {
    case ADD_SELECTED_METRIC:
      draft.selectedMetrics = [...draft.selectedMetrics, action.payload];
      break;
    case REMOVE_SELECTED_METRIC:
      draft.selectedMetrics = draft.selectedMetrics.filter((m: string) => m !== action.payload);
      break;
    default:
      break;
  }
};

export default produce(metricsReducer, initialState);
