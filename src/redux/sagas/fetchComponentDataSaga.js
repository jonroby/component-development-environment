import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchComponentDataSuccess, fetchComponentDataFailure, types } from '../actions/cde';
import api from '../api.js';
import { request, transform } from './helpers/fetchComponentData';

export function* fetchComponentDataSaga({ payload }) {
  const data = yield call(api.get, request.get(payload));

  const transformedData = transform(data, payload);

  if (transformedData.errors) {
    yield put(fetchComponentDataFailure(transformedData.errors));
  }

  if (transformedData.data) {
    yield put(fetchComponentDataSuccess(transformedData.data));
  }
}

function* saga() {
  yield takeEvery(types.FETCH_COMPONENT_DATA, fetchComponentDataSaga);
}

export default saga;
