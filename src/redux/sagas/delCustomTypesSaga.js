import { call, put, takeEvery } from 'redux-saga/effects';
import { delCustomTypesSuccess, delCustomTypesFailure, types } from '../actions/cde';
import { del } from '../api.js';
import { delOptions, transform } from './transforms/delCustomTypes';

export function* delCustomTypesSaga({ payload }) {
  const data = yield call(del, delOptions(payload));

  const transformedData = transform(data, payload);

  if (transformedData.errors) {
    yield put(delCustomTypesFailure(transformedData.errors));
  }

  if (transformedData.data) {
    yield put(delCustomTypesSuccess(transformedData.data));
  }
}

function* saga() {
  yield takeEvery(types.DEL_CUSTOM_TYPES, delCustomTypesSaga);
}

export default saga;
