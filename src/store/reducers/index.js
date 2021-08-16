import { combineReducers } from 'redux';
import metricsReducer from './metricsReducer';

const rootReducer = combineReducers({
  metrics: metricsReducer,
});

export default rootReducer;
