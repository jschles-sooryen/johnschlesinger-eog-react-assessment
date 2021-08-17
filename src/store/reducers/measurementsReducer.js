import { produce } from 'immer';
import { format } from 'date-fns';
import { SET_HISTORICAL_MEASUREMENT, SET_REAL_TIME_MEASUREMENT } from '../actions/types';

const initialState = {
  realTime: {
    casingPressure: null,
    injValveOpen: null,
    tubingPressure: null,
    flareTemp: null,
    oilTemp: null,
    waterTemp: null,
  },
  historical: [],
};

const formatTimeMeasurements = (metric) => {
  const formatted = metric.measurements.map((meas) => ({ ...meas, at: format(meas.at, 'h:mm') }));
  return formatted;
};

const measurementsReducer = (draft, action) => {
  switch (action.type) {
    case SET_REAL_TIME_MEASUREMENT:
      draft.realTime[action.payload.metric] = action.payload;
      break;
    case SET_HISTORICAL_MEASUREMENT:
      draft.historical = action.payload.map((metric) => ({
        ...metric,
        measurements: formatTimeMeasurements(metric),
      }));
      break;
    default:
      break;
  }
};

export default produce(measurementsReducer, initialState);
