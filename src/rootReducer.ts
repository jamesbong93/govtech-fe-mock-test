import { combineReducers } from '@reduxjs/toolkit';
import trafficImagesReducer from './features/trafficImages/trafficImagesSlice';
import weatherForecastsReducer from './features/weatherForcasts/weatherForecastsSlice';

const rootReducer = combineReducers({
  trafficImages: trafficImagesReducer,
  weatherForecasts: weatherForecastsReducer
});

export default rootReducer;
