import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import common, { commonSaga } from './common';

export const rootReducer = combineReducers({
    common,
});

export function* rootSaga() {
    yield all([
        fork(commonSaga),
    ]);
}
