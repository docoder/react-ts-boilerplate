import { call, put } from 'redux-saga/effects'
import {types as commonTyps} from '../redux/modules/common'

const env = process.env.NODE_ENV;
const href = window.location.href;
const protol = window.location.protocol;
let hostname = window.location.hostname;

let loginUrl = '';
switch (env) {
    case 'development':
        loginUrl = protol + 'dev.login.example.com'
        break;
    case 'production':
        loginUrl = protol + 'prod.login.example.com'
        break;
}

const return_login = loginUrl + '?returnUrl=' + encodeURIComponent(href)

export function login() {
    return window.location.replace(return_login)
}
export function fetch2(url: string, options: any) {
    let realUrl = url;
    let opt = options || {}
    opt.credentials = opt.credentials || 'include'
    return fetch(realUrl, opt)
        .then(response => response.json())
        .then((json) => {
            if (json.code === 40003 || json.code === 201 || json.code=== 401) {
                login()
                throw new Error('Please Login First!')
            } else {
                return json;
            }
        })
}

export function* GET(url:string) {
    return yield * REQ('get', url)
}
export function* POST(url: string, body: Json) {
    return yield * REQ('post', url, body)
}

function* REQ(method:string, url:string, body?: Json) {
    try {
        yield put({ type: commonTyps.START_REQUEST });
        const data = yield call(fetch2, url, method === 'post' ? {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        } : null);
        yield put({ type: commonTyps.FINISH_REQUEST });
        if (data.code === 0 && data.data) {
            return data;
        }else {
            yield put({
                type: commonTyps.SET_ERROR,
                payload: data
            });
        }

    } catch (error) {
        yield put({
            type: commonTyps.SET_ERROR,
            payload: error
        });
    }
    return null
}
