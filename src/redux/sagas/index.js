import { all, call } from 'redux-saga/effects';
import fetchFakePropsSaga from './fetchFakePropsSaga';
import fetchPropsAstsSaga from './fetchPropsAstsSaga';

export default function* rootSaga() {
  yield all([
    call(fetchFakePropsSaga),
    call(fetchPropsAstsSaga)
  ]);
}

