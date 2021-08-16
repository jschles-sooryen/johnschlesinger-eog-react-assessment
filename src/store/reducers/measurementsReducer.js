import { produce } from 'immer';
import { SET_REAL_TIME_MEASUREMENT } from '../actions/types';

const initialState = {
  realTime: {
    casingPressure: null,
    injValveOpen: null,
    tubingPressure: null,
    flareTemp: null,
    oilTemp: null,
    waterTemp: null,
  },
  historical: {
    casingPressure: [],
    injValveOpen: [],
    tubingPressure: [],
    flareTemp: [],
    oilTemp: [],
    waterTemp: [],
  },
};

const measurementsReducer = (draft, action) => {
  switch (action.type) {
    case SET_REAL_TIME_MEASUREMENT:
      draft.realTime[action.payload.metric] = action.payload;
      break;
    default:
      break;
  }
};

export default produce(measurementsReducer, initialState);
