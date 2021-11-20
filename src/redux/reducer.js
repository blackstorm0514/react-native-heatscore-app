import { put, takeLatest, select } from "redux-saga/effects";

const INITIAL_STATE = {
    user: null,
    favorites: [],
};

export const actionTypes = {
    setUserAction: 'SET_USER_ACTION',
    setFavoritesAction: 'SET_FAVORITES_ACTION',
    addFavoritesAction: 'ADD_FAVORITES_ACTION',
    removeFavoritesAction: 'REMOVE_FAVORITES_ACTION',
}

export const actions = {
    setUserAction: (user) => ({ type: actionTypes.setUserAction, user }),
    setFavoritesAction: (favorites) => ({ type: actionTypes.setFavoritesAction, favorites }),
    addFavoritesAction: (favorite) => ({ type: actionTypes.addFavoritesAction, favorite }),
    removeFavoritesAction: (favorite) => ({ type: actionTypes.setFavoritesAction, favorite }),
}

export const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.setUserAction:
            return { ...state, user: action.user }

        case actionTypes.setFavoritesAction:
            return { ...state, favorites: action.favorites };

        case actionTypes.addFavoritesAction:
            return { ...state, favorites: [...state.favorites, action.favorite] };

        case actionTypes.removeFavoritesAction:
            return {
                ...state,
                favorites: state.favorites.filter(favorite =>
                    favorite.sport == action.favorite.sport &&
                    favorite.team.name == action.favorite.team.name)
            };

        default:
            return state;
    }
};

export function* rootSaga() { }