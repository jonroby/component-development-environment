import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchCustomTypesSuccess, fetchCustomTypesFailure, types } from '../actions/cde';
import { get } from '../api.js';
import { getOptions, transform } from './transforms/fetchCustomTypes';

export function* fetchCustomTypesSaga({ payload }) {
  const data = yield call(get, getOptions(payload));

  const transformedData = transform(data, payload);

  if (transformedData.errors) {
    yield put(fetchCustomTypesFailure(transformedData.errors));
  }

  if (transformedData.data) {
    yield put(fetchCustomTypesSuccess(transformedData.data));
  }
}

function* saga() {
  yield takeEvery(types.FETCH_CUSTOM_TYPES, fetchCustomTypesSaga);
}

export default saga;
