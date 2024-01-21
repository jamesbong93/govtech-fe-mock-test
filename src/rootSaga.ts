import { all } from 'redux-saga/effects';
import { watchFetchTrafficImages } from './features/trafficImages/trafficImagesSagas';
import { watchFetchWeatherForecasts } from './features/weatherForecasts/weatherForcastsSagas';


/**
 * Root saga function that combines multiple sagas.
 * @returns {Generator} The generator object.
 */
export default function* rootSaga() {
  yield all([
    watchFetchTrafficImages(),
    watchFetchWeatherForecasts()
  ]);
}
