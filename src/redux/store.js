import { rootReducer, rootSaga } from './reducer';
import { reduxBatch } from "@manaflair/redux-batch";
import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware();
const middleware = [
    ...getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: true
    }),
    sagaMiddleware
];

export const store = configureStore({
    reducer: rootReducer,
    middleware: middleware,
    enhancers: [reduxBatch]
});

sagaMiddleware.run(rootSaga);
