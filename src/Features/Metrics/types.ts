export interface SelectedMetricsProps {
  selectedMetrics: string[];
}

export interface MetricsSelectProps extends SelectedMetricsProps {
  options: string[];
}

export interface MetricsRealTimeInfoProps extends SelectedMetricsProps {
  realTimeMeasurements: {
    [key: string]: Measurement | null;
  }
}

export interface MetricsLineChartProps extends SelectedMetricsProps {
  chartData: ChartMeasurement[];
  historicalData: GetMultipleMeasurementsData;
}

export interface Measurement {
  metric: string;
  at: number;
  value: number;
  unit: string;
}

export interface ChartMeasurement {
  [key: string]: number;
  at: number;
}

export type GetMetricsResponse = {
  getMetrics: string[];
};

export type GetMultipleMeasurementsData = {
  metric: string;
  measurements: Measurement[];
};

export type GetMultipleMeasurementsResponse = {
  getMultipleMeasurements: GetMultipleMeasurementsData;
};
