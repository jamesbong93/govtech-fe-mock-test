export interface ValidPeriod  {
	start: Date;
	end: Date;
}

export interface WeatherForecast {
	area: string;
	forecast: string;
	valid_period: ValidPeriod
}

export interface area_metadata  {
	name: string;
	location: {};
}

export interface WeatherForecastStates {
  weatherForecast: WeatherForecast;
	selectedDate: Date | null;
	selectedArea: string | null;
  loading: boolean;
  error: string | null;
}

// Action type constants
export const FETCH_WEATHER_FORECASTS_BEGIN = 'FETCH_WEATHER_FORECASTS_BEGIN';
export const FETCH_WEATHER_FORECASTS_SUCCESS = 'FETCH_WEATHER_FORECASTS_SUCCESS';
export const FETCH_WEATHER_FORECASTS_FAILURE = 'FETCH_WEATHER_FORECASTS_FAILURE';
  
  