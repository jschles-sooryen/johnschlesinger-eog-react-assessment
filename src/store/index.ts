import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { Measurement } from '../Features/Metrics/types';

const store = createStore(rootReducer, composeWithDevTools());

export interface RootState {
  metrics: {
    selectedMetrics: string[];
  };
  realTime: {
    [key: string]: Measurement | null;
  };
  historical: {
    measurements: any[];
  };
}

export default store;
