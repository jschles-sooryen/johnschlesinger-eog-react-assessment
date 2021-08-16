import { produce } from 'immer';

const initialState = {
  selectedMetrics: [],
};

const metricsReducer = (draft, action) => {
  switch (action.type) {
    default:
      break;
  }
};

export default produce(metricsReducer, initialState);
