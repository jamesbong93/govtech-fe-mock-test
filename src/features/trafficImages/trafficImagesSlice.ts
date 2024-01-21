import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrafficImage, TrafficImagesState } from './types';

const initialState: TrafficImagesState = {
  trafficImages: [],
  loading: false,
  error: null,
};

const trafficImagesSlice = createSlice({
  name: 'trafficImages',
  initialState,
  reducers: {
    fetchTrafficImagesBegin: (state) => {
      state.loading = true;
    },
    fetchTrafficImagesSuccess: (state, action: PayloadAction<TrafficImage[]>) => {
      state.loading = false;
      state.trafficImages = action.payload;
    },
    fetchTrafficImagesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  fetchTrafficImagesBegin, 
  fetchTrafficImagesSuccess, 
  fetchTrafficImagesFailure 
} = trafficImagesSlice.actions;

export default trafficImagesSlice.reducer;
