import { all, call } from 'redux-saga/effects';
// import fetchFakePropsSaga from './fetchFakePropsSaga';
// import fetchPropsAstsSaga from './fetchPropsAstsSaga';
// import fetchCustomTypesSaga from './fetchCustomTypesSaga';
// import postCustomTypesSaga from './postCustomTypesSaga';
// import delCustomTypesSaga from './delCustomTypesSaga';
import fetchComponentData from './fetchComponentDataSaga';
import handleSnapshots from './handleSnapshotsSaga';

export default function* rootSaga() {
  yield all([
    // call(fetchFakePropsSaga),
    // call(fetchPropsAstsSaga),
    // call(fetchCustomTypesSaga),
    // call(postCustomTypesSaga),
    // call(delCustomTypesSaga),
    call(fetchComponentData),
    call(handleSnapshots)
  ]);
}

