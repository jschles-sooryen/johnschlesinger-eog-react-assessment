import { combineReducers } from 'redux';
import metricsReducer from './metricsReducer';
import measurementsReducer from './measurementsReducer';

const rootReducer = combineReducers({
  metrics: metricsReducer,
  measurements: measurementsReducer,
});

export default rootReducer;
