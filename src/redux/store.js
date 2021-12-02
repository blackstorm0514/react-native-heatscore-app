import { rootReducer, rootSaga } from './reducer';
import { reduxBatch } from "@manaflair/redux-batch";
import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore } from 'redux-persist';

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

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
