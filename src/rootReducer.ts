import { combineReducers } from '@reduxjs/toolkit';
import trafficImagesReducer from './features/trafficImages/trafficImagesSlice';

const rootReducer = combineReducers({
  trafficImages: trafficImagesReducer,
});

export default rootReducer;
