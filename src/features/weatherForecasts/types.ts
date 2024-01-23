export interface ValidPeriod  {
	start: string;
	end: string;
}

export interface forecast {
	forecast: string;
	area: string
}

export interface WeatherForecasts {
	forecasts: forecast[];
	valid_period: ValidPeriod
}

export interface WeatherDisplayProps {
  selectedDate: Date;
  selectedLocation: string;
}

export interface AreaMetadata  {
	name: string;
	label_location: {
		latitude: number,
		longitude: number
	};
}

export interface WeatherForecastStates {
	weatherForecasts: WeatherForecasts;
	selectedDate: Date | null;
	selectedArea: string | null;
	loading: boolean;
	error: string | null;
}

// Action type constants
export const FETCH_WEATHER_FORECASTS_BEGIN = "FETCH_WEATHER_FORECASTS_BEGIN";
export const FETCH_WEATHER_FORECASTS_SUCCESS = "FETCH_WEATHER_FORECASTS_SUCCESS";
export const FETCH_WEATHER_FORECASTS_FAILURE = "FETCH_WEATHER_FORECASTS_FAILURE";
  
  