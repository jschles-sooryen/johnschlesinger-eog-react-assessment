import { combineReducers } from 'redux';
import metricsReducer from './metricsReducer';
import realTimeReducer from './realTimeReducer';
import historicalReducer from './historicalReducer';

const rootReducer = combineReducers({
  metrics: metricsReducer,
  realTime: realTimeReducer,
  historical: historicalReducer,
});

export default rootReducer;
