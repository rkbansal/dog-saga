import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

function fetchDog() {
  return axios({
    method: 'get',
    url: 'https://dog.ceo/api/breeds/image/random'
  });
};

function* workerSaga() {
  try {
    const response = yield call(fetchDog);
    const dog = response.data.message;

    // dispatch a success action to the store with the new dog
    yield put({type: "API_CALL_SUCCESS", dog});

  } catch(error) {
    // dispatch a failure action to the store with the error
    yield put({type: "API_CALL_FAILURE", error});
  }
};

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest('API_CALL_REQUEST', workerSaga);
};