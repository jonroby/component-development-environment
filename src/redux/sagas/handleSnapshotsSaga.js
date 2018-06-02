import { call, put, takeEvery } from 'redux-saga/effects';
import { handleSnapshotsSuccess, handleSnapshotsFailure, types } from '../actions/cde';
import api from '../api.js';
import { request, transform } from './helpers/handleSnapshots';

export function* handleSnapshotsSaga({ payload }) {
  const data = yield call(api[payload.restMethod], request[payload.restMethod](payload));

  const transformedData = transform(data, payload);

  if (transformedData.errors) {
    yield put(handleSnapshotsFailure(transformedData.errors));
  }

  if (transformedData.data) {
    yield put(handleSnapshotsSuccess(transformedData.data));
  }
}

function* saga() {
  yield takeEvery(types.HANDLE_SNAPSHOTS, handleSnapshotsSaga);
}

export default saga;
