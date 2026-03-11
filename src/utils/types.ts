//////////////////////
// Types
//////////////////////
export type Adapter = {
  name: string;
  state: boolean;
};
export enum Weather {
  Sunny = "Sunny",
  Drought = "Drought",
  Badtide = "Badtide",
  Error = "ERROR",
  Missing = "No weather info available"
}
export type GraphInfo = {
  points: { time: number; value: number; }[];
  thresholds: number[];
  percentage: boolean;
};
export type AutomationState = {
  weather: Weather;
  graphs: Record<string, GraphInfo>;
  signals: Record<string, boolean>;
  hour?: number;
  day?: number;
  cycle?: number;
  error?: ApiError;
};
export enum ApiError {
  CORS,
  NOT_FOUND,
  UNKNOWN,
}