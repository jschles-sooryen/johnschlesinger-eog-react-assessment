import { produce, Draft } from 'immer';
import { AnyAction } from 'redux';
import { SET_REAL_TIME_MEASUREMENT } from '../actions/types';

import { Measurement } from '../../Features/Metrics/types';

type RealTimeState = {
  [key: string]: Measurement | null;
};

const initialState = {
  realTime: {},
  historical: [],
};

const realTimeReducer = <T extends RealTimeState>(draft: Draft<T>, action: AnyAction) => {
  switch (action.type) {
    case SET_REAL_TIME_MEASUREMENT:
      (draft[action.payload.metric] as Measurement) = action.payload;
      break;
    default:
      break;
  }
};

export default produce(realTimeReducer, initialState);
