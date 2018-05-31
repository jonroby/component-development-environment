import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchPropsAstsSuccess, fetchPropsAstsFailure, types } from '../actions/cde';
import { get } from '../api.js';
import { getOptions, transform } from './transforms/fetchPropsAsts';

export function* fetchPropsAstsHandler({ payload }) {
  const data = yield call(get, getOptions(payload));

  const transformedData = transform(data, payload);

  if (transformedData.errors) {
    yield put(fetchPropsAstsFailure(transformedData.errors));
  }

  if (transformedData.data) {
    yield put(fetchPropsAstsSuccess(transformedData.data));
  }
}

function* saga() {
  yield takeEvery(types.FETCH_PROPS_ASTS, fetchPropsAstsHandler);
}

export default saga;
