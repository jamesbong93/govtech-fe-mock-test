import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherForecast, WeatherForecastStates, } from './types';

interface WeatherForecastPayload {
	selectedDate: Date
	selectedArea: string
}


const initialState: WeatherForecastStates = {
  weatherForecast: {
		area: '',
		forecast: '',
		valid_period: {
			start: new Date(),
			end: new Date()
		}
	},
  selectedDate: null,
  selectedArea: '',
  loading: false,
  error: null,
};

const weatherForecastsSlice = createSlice({
  name: 'WeatherForecasts',
  initialState,
  reducers: {
    fetchWeatherForecastsBegin: (state, action: PayloadAction<WeatherForecastPayload>) => {
      state.loading = true;
	  	state.selectedDate = action.payload.selectedDate;
    	state.selectedArea = action.payload.selectedArea;
    },
    fetchWeatherForecastsSuccess: (state, action: PayloadAction<WeatherForecast>) => {
      state.loading = false;
      state.weatherForecast = action.payload;
    },
    fetchWeatherForecastsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  fetchWeatherForecastsBegin, 
  fetchWeatherForecastsSuccess, 
  fetchWeatherForecastsFailure,
} = weatherForecastsSlice.actions;

export default weatherForecastsSlice.reducer;
