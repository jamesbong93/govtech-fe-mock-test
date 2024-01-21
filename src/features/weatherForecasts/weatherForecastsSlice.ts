import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherForecasts, WeatherForecastStates } from './types';

// Define the shape of the payload for weather forecast actions
interface WeatherForecastPayload {
    selectedDate: Date;
    selectedArea: string;
}

// Define the initial state for the weather forecasts slice
const initialState: WeatherForecastStates = {
  weatherForecasts: {
    forecasts: [],
    valid_period: {
      start: null,
      end: null
    }
  },
  selectedDate: null,
  selectedArea: '',
  loading: false,
  error: null,
};

// Create a slice for weather forecasts with reducers to handle actions
const weatherForecastsSlice = createSlice({
  name: 'WeatherForecasts',
  initialState,
  reducers: {
    // Reducer to handle the beginning of a weather forecasts fetch
    fetchWeatherForecastsBegin: (state, action: PayloadAction<WeatherForecastPayload>) => {
      state.loading = true;
      state.selectedDate = action.payload.selectedDate;
      state.selectedArea = action.payload.selectedArea;
    },
    // Reducer to handle successful fetching of weather forecasts
    fetchWeatherForecastsSuccess: (state, action: PayloadAction<WeatherForecasts>) => {
      state.loading = false;
      state.weatherForecasts = action.payload;
    },
    // Reducer to handle a failure in fetching weather forecasts
    fetchWeatherForecastsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export the generated actions from the slice
export const { 
  fetchWeatherForecastsBegin, 
  fetchWeatherForecastsSuccess, 
  fetchWeatherForecastsFailure,
} = weatherForecastsSlice.actions;

// Export the reducer from the slice as the default export
export default weatherForecastsSlice.reducer;
