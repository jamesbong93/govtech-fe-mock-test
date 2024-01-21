import { combineReducers } from '@reduxjs/toolkit';
import trafficImagesReducer from './features/trafficImages/trafficImagesSlice';
import weatherForecastsReducer from './features/weatherForecasts/weatherForecastsSlice';

/**
 * Root reducer function that combines multiple reducers into a single reducer.
 * @returns The combined reducer.
 */
const rootReducer = combineReducers({
  trafficImages: trafficImagesReducer,
  weatherForecasts: weatherForecastsReducer
});

export default rootReducer;
