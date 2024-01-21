import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  fetchWeatherForecastsBegin,
  fetchWeatherForecastsSuccess, 
  fetchWeatherForecastsFailure,
} from './weatherForecastsSlice';
import { WeatherForecasts } from './types';
import { fetchWeatherForecastsItems } from 'api/govTechDataAPI';
import { formatDateToISOString } from 'helpers/commons';

/**
 * Worker Saga: Fetches weather forecasts based on the selected date and area.
 * @param {ReturnType<typeof fetchWeatherForecastsBegin>} action - The action payload containing selectedDate and selectedArea.
 */
function* fetchWeatherForecastsSaga(action: ReturnType<typeof fetchWeatherForecastsBegin>) {
  try {
    const { selectedDate, selectedArea } = action.payload;

    // Validate payload data
    if (!selectedDate || !selectedArea) {
      throw new Error('Selected date or area is null');
    }

    const formattedDate: string = formatDateToISOString(selectedDate);
    const weatherForecasts: WeatherForecasts = yield call(fetchWeatherForecastsItems, formattedDate);
    
    // Dispatch success action if weather forecasts are fetched successfully
    if (weatherForecasts) {
      yield put(fetchWeatherForecastsSuccess(weatherForecasts));
    } else {
      throw new Error('No weather forecast items found');
    }
  } catch (error) {
    // Dispatch failure action in case of any errors
    if (error instanceof Error) {
      yield put(fetchWeatherForecastsFailure(error.message));
    } else {
      yield put(fetchWeatherForecastsFailure("An unexpected error occurred"));
    }
  }
}

/**
 * Watcher Saga: Watches for the `fetchWeatherForecastsBegin` action and starts the worker saga.
 */
export function* watchFetchWeatherForecasts() {
  yield takeLatest(fetchWeatherForecastsBegin, fetchWeatherForecastsSaga);
}
