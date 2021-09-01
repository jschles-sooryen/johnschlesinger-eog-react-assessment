export interface MetricSelectProps {
  options: string[];
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
