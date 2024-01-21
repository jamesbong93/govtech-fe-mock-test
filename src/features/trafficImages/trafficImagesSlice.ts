import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrafficImage, TrafficImagesState, Location } from './types';

const initialState: TrafficImagesState = {
  trafficImages: [],
  selectedDate: null,
  selectedLocation: null,
  locationList: [],
  loading: false,
  error: null,
};

const trafficImagesSlice = createSlice({
  name: 'trafficImages',
  initialState,
  reducers: {
    fetchTrafficImagesBegin: (state, action: PayloadAction<Date | null>) => {
      state.loading = true;
      state.selectedDate = action.payload;
    },
    fetchTrafficImagesSuccess: (state, action: PayloadAction<TrafficImage[]>) => {
      state.loading = false;
      state.trafficImages = action.payload;
    },
    fetchTrafficImagesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setLocationList: (state, action: PayloadAction<Location[]>) => {
      state.locationList = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<string | null>) => {
      state.selectedLocation = action.payload;
    }
  },
});

export const { 
  fetchTrafficImagesBegin, 
  fetchTrafficImagesSuccess, 
  fetchTrafficImagesFailure,
  setLocationList
} = trafficImagesSlice.actions;

export default trafficImagesSlice.reducer;
