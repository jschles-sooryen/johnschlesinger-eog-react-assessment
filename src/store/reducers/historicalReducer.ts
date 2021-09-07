import { produce, Draft } from 'immer';
import { format } from 'date-fns';
import { AnyAction } from 'redux';
import { SET_HISTORICAL_MEASUREMENT } from '../actions/types';

import { GetMultipleMeasurementsData, Measurement, ChartMeasurement } from '../../Features/Metrics/types';

type HistoricalState = {
  measurements: ChartMeasurement[];
};

const initialState = {
  measurements: [],
};

const formatTimeMeasurements = (metric: GetMultipleMeasurementsData) => {
  const formatted = metric.measurements.map((meas: Measurement) => ({ ...meas, at: format(meas.at, 'h:mm') }));
  return formatted;
};

const measurementsReducer = <T extends HistoricalState>(draft: Draft<T>, action: AnyAction) => {
  switch (action.type) {
    case SET_HISTORICAL_MEASUREMENT:
      draft.measurements = action.payload.map((metric: GetMultipleMeasurementsData) => ({
        ...metric,
        measurements: formatTimeMeasurements(metric),
      }));
      break;
    default:
      break;
  }
};

export default produce(measurementsReducer, initialState);
