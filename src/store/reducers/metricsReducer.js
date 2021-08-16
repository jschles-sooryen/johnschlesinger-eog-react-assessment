import { produce } from 'immer';
import { ADD_SELECTED_METRIC, REMOVE_SELECTED_METRIC } from '../actions/types';

const initialState = {
  selectedMetrics: [],
};

const metricsReducer = (draft, action) => {
  switch (action.type) {
    case ADD_SELECTED_METRIC:
      draft.selectedMetrics = [...draft.selectedMetrics, action.payload];
      break;
    case REMOVE_SELECTED_METRIC:
      draft.selectedMetrics = draft.selectedMetrics.filter((m) => m !== action.payload);
      break;
    default:
      break;
  }
};

export default produce(metricsReducer, initialState);
