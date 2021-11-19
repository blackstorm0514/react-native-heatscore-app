import { put, takeLatest, select } from "redux-saga/effects";

const INITIAL_STATE = {
    user: null,
};

export const actionTypes = {
    getUserAction: 'GET_USER_ACTION',
    setUserAction: 'SET_USER_ACTION',
}

export const actions = {
    setUserAction: (user) => ({ type: actionTypes.setUserAction, user }),
}

export const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.setUserAction:
            return { ...state, user: action.user }

        default:
            return state;
    }
};

export function* rootSaga() {}