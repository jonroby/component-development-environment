import { call, put, takeEvery } from 'redux-saga/effects';
import { postCustomTypesSuccess, postCustomTypesFailure, types } from '../actions/cde';
import { post } from '../api.js';
import { postOptions, transform } from './transforms/postCustomTypes';

export function* postCustomTypesSaga({ payload }) {
  const data = yield call(post, postOptions(payload));

  const transformedData = transform(data, payload);

  if (transformedData.errors) {
    yield put(postCustomTypesFailure(transformedData.errors));
  }

  if (transformedData.data) {
    yield put(postCustomTypesSuccess(transformedData.data));
  }
}

function* saga() {
  yield takeEvery(types.POST_CUSTOM_TYPES, postCustomTypesSaga);
}

export default saga;
