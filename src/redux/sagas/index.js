import { all, call } from 'redux-saga/effects';
import cdeSaga from './cde';

export default function* rootSaga() {
  yield all([
    call(cdeSaga),
  ]);
}

