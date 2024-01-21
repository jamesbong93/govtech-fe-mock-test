import { call, put, takeLatest } from 'redux-saga/effects';
import { 
	fetchWeatherForecastsBegin,
	fetchWeatherForecastsSuccess, 
	fetchWeatherForecastsFailure,
} from './weatherForecastsSlice';
import { WeatherForecast } from './types';

interface Item {
	valid_period: {
		start: string,
		end: string
	};
	timestamp: string;
	forecasts: WeatherForecast[];
}

interface ApiInfo {
	status: string;
}

interface FetchResponse {
	items: Item[];
	api_info: ApiInfo;
}

interface ResponseGenerator{
	json:any,
}

// Format date to string format YYYY-MM-DD[T]HH:mm:ss
function formatDateToISOString(date: Date): string {
	const pad = (num: number): string => num.toString().padStart(2, '0');

	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1); // getMonth() returns 0-11
	const day = pad(date.getDate());
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

// Worker Saga
function* fetchWeatherForecastsSaga(action: ReturnType<typeof fetchWeatherForecastsBegin>) {
	try {
		const {selectedDate, selectedArea} = action.payload

		if (!selectedDate && !selectedArea) {
			throw new Error('Selected date is null');
		}

		const formattedDate: string = formatDateToISOString(selectedDate);
		const url = `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${encodeURIComponent(formattedDate)}`;
		const response:ResponseGenerator = yield call(fetch, url);

		const data: FetchResponse = yield call([response, response.json]);
		// Get the first item from response items which contain all the cameras data
		if (data.items.length > 0) {
			const forecasts = data.items[0].forecasts;
			const validPeriod = data.items[0].valid_period;
			const foundForecast = forecasts.find(forecast => forecast.area === selectedArea);

			if (foundForecast && validPeriod) {
				foundForecast.valid_period = {
					start: new Date(validPeriod.start),
					end: new Date(validPeriod.end),
				};
		
				yield put(fetchWeatherForecastsSuccess(foundForecast));
			}
		} else {
			throw new Error('No items found in response');
		}
	} catch (error) {
	if (error instanceof Error) {
		yield put(fetchWeatherForecastsFailure(error.message));
	} else {
		yield put(fetchWeatherForecastsFailure("Something went wrong"));
	}
	}
}

// Watcher Saga
export function* watchFetchWeatherForecasts() {
	yield takeLatest(fetchWeatherForecastsBegin, fetchWeatherForecastsSaga);
}
