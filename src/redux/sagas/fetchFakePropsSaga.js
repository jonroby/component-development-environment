import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchFakePropsSuccess, fetchFakePropsFailure, types } from '../actions/cde';
import { get } from '../api.js';
import { getOptions, transform } from './transforms/fetchFakeProps';

export function* fetchFakePropsSaga({ payload }) {
  const data = yield call(get, getOptions(payload));

  const transformedData = transform(data, payload);

  if (transformedData.errors) {
    yield put(fetchFakePropsFailure(transformedData.errors));
  }

  if (transformedData.data) {
    yield put(fetchFakePropsSuccess(transformedData.data));
  }
}

function* saga() {
  yield takeEvery(types.FETCH_FAKE_PROPS, fetchFakePropsSaga);
}

export default saga;
