import { produce, Draft } from 'immer';
import { format } from 'date-fns';
import { AnyAction } from 'redux';
import { SET_HISTORICAL_MEASUREMENT, SET_REAL_TIME_MEASUREMENT } from '../actions/types';

import { GetMultipleMeasurementsData, Measurement, ChartMeasurement } from '../../Features/Metrics/types';

type MeasurementsState = {
  realTime: {
    [key: string]: Measurement | null;
  };
  historical: ChartMeasurement[];
};

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

const formatTimeMeasurements = (metric: GetMultipleMeasurementsData) => {
  const formatted = metric.measurements.map((meas: Measurement) => ({ ...meas, at: format(meas.at, 'h:mm') }));
  return formatted;
};

const measurementsReducer = <T extends MeasurementsState>(draft: Draft<T>, action: AnyAction) => {
  switch (action.type) {
    case SET_REAL_TIME_MEASUREMENT:
      draft.realTime[action.payload.metric] = action.payload;
      break;
    case SET_HISTORICAL_MEASUREMENT:
      draft.historical = action.payload.map((metric: GetMultipleMeasurementsData) => ({
        ...metric,
        measurements: formatTimeMeasurements(metric),
      }));
      break;
    default:
      break;
  }
};

export default produce(measurementsReducer, initialState);
