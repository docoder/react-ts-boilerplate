import {delay} from 'redux-saga/effects';
import {call, put, all, takeLatest} from 'redux-saga/effects';
import { AppState } from '../store'

export type Error = {
    code: number;
    message: string;
} | null
export type Message = {
    title?: string;
    message: string;
} | null
export interface CommonState {
    requestQuantity: number;
    error: Error;
    warning: Message;
    success: Message;
    info: Message;
}
const initialState: CommonState = {
    requestQuantity: 0, 
    error: null, 
    warning: null, 
    success: null,
    info: null, 
};

// action types
export const types: {[key: string]:string} = {
    START_REQUEST: 'COMMON/START_REQUEST', 
    FINISH_REQUEST: 'COMMON/FINISH_REQUEST', 
    CLEAR_REQUEST: 'COMMON/CLEAR_REQUEST', 
    SET_ERROR: 'COMMON/SET_ERROR', 
    REMOVE_ERROR: 'COMMON/REMOVE_ERROR', 
    SET_WARNING: 'COMMON/SET_WARNING', 
    REMOVE_WARNING: 'COMMON/REMOVE_WARNING', 
    SET_SUCCESS: 'COMMON/SET_SUCCESS', 
    REMOVE_SUCCESS: 'COMMON/REMOVE_SUCCESS', 
    SET_INFO: 'COMMON/SET_INFO', 
    REMOVE_INFO: 'COMMON/REMOVE_INFO', 
};
interface SetErrorAction {
    type: string;
    payload: Error;
}
interface SetMessageAction {
    type: string;
    payload: Message;
}

export type CommonActionTypes = SetErrorAction | SetMessageAction;

// action creators
export const actions = {
    startRequest: () => ({
        type: types.START_REQUEST,
    }),
    finishRequest: () => ({
        type: types.FINISH_REQUEST,
    }),
    clearRequest: () => ({
        type: types.CLEAR_REQUEST,
    }),
    setError: (error: Error) => ({
        type: types.SET_ERROR,
        payload: error,
    }),
    removeError: () => ({
        type: types.REMOVE_ERROR,
    }),
    setWarning: (warning: Message) => ({
        type: types.SET_WARNING,
        payload: warning,
    }),
    removeWarning: () => ({
        type: types.REMOVE_WARNING,
    }),
    setSuccess: (success: Message) => ({
        type: types.SET_SUCCESS,
        payload: success,
    }),
    removeSuccess: () => ({
        type: types.REMOVE_SUCCESS,
    }),
    setInfo: (info: Message) => ({
        type: types.SET_INFO,
        payload: info,
    }),
    removeInfo: () => ({
        type: types.REMOVE_INFO,
    }),
};
function* setSuccess() {
    yield delay(3000);
    yield put({type: types.REMOVE_SUCCESS});
}
function* setInfo() {
    yield delay(3000);
    yield put({type: types.REMOVE_INFO});
}
// sagas
export function* commonSaga() {
    yield all([
        takeLatest(types.SET_SUCCESS, setSuccess),
        takeLatest(types.SET_INFO, setInfo),
    ]);
}

// reducers
const reducer = (
    state = initialState,
    action: CommonActionTypes,
): CommonState => {
    switch (action.type) {
        case types.START_REQUEST:
            
            return {...state, requestQuantity: state.requestQuantity + 1};
        case types.FINISH_REQUEST:
            
            return {...state, requestQuantity: state.requestQuantity - 1};
        case types.CLEAR_REQUEST:
            
            return {...state, requestQuantity: 0};
        case types.SET_ERROR:
            return {...state, error: action.payload as Error};
        case types.REMOVE_ERROR:
            return {...state, error: null};
        case types.SET_WARNING:
            return {...state, warning: action.payload as Message};
        case types.REMOVE_WARNING:
            return {...state, warning: null};
        case types.SET_SUCCESS:
            return {...state, success: action.payload as Message};
        case types.REMOVE_SUCCESS:
            return {...state, success: null};
        case types.SET_INFO:
            return {...state, info: action.payload as Message};
        case types.REMOVE_INFO:
            return {...state, info: null};
        default:
            return state;
    }
};
export default reducer;

// selectors
export const getError = (state: AppState) => {
    return state.common.error;
};
export const getWarning = (state: AppState) => {
    return state.common.warning;
};
export const getSuccess = (state: AppState) => {
    return state.common.success;
};
export const getInfo = (state: AppState) => {
    return state.common.info;
};

export const getRequestQuantity = (state: AppState) => {
    return state.common.requestQuantity;
};
