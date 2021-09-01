import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools());

export interface RootState {
  metrics: {
    selectedMetrics: string[];
  };
  measurements: {
    realTime: {
      casingPressure: null | object;
      injValveOpen: null | object;
      tubingPressure: null | object;
      flareTemp: null | object;
      oilTemp: null | object;
      waterTemp: null | object;
    };
    historical: any[];
  };
}

export default store;
