import { all } from 'redux-saga/effects';
import { watchFetchTrafficImages } from './features/trafficImages/trafficImagesSagas';
import { watchFetchWeatherForecasts } from './features/weatherForcasts/weatherForcastsSagas';


export default function* rootSaga() {
  yield all([
    watchFetchTrafficImages(),
    watchFetchWeatherForecasts()
  ]);
}
