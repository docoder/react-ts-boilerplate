import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer, rootSaga } from "./modules";

const sagaMiddleware = createSagaMiddleware()

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [sagaMiddleware]
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
    sagaMiddleware.run(rootSaga)
    return store;
}

