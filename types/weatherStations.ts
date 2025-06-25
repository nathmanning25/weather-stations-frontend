export interface Measurement {
  id: number;
  weatherStationId: number;
  variable_name: string;
  value: number;
  timestamp: string;
}

export interface WeatherStation {
  id: number;
  wsName: string;
  site: string;
  portfolio: string;
  state: string;
  latitude: number;
  longitude: number;
  measurements: Measurement[];
}

export type WeatherStationState = string;

export type APIResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: string; data: T };