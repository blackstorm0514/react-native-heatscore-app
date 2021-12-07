import { put, takeLatest, select } from "redux-saga/effects";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['collapsedLeagues']
};

const INITIAL_STATE = {
    user: null,
    favorites: [],
    collapsedLeagues: [],
};

export const actionTypes = {
    setUserAction: 'SET_USER_ACTION',
    setFavoritesAction: 'SET_FAVORITES_ACTION',
    addFavoritesAction: 'ADD_FAVORITES_ACTION',
    removeFavoritesAction: 'REMOVE_FAVORITES_ACTION',
    toggleCollapseLeagueAction: 'TOGGLE_COLLAPSE_LEAGUE_ACTION',
}

export const actions = {
    setUserAction: (user) => ({ type: actionTypes.setUserAction, user }),
    setFavoritesAction: (favorites) => ({ type: actionTypes.setFavoritesAction, favorites }),
    addFavoritesAction: (favorite) => ({ type: actionTypes.addFavoritesAction, favorite }),
    removeFavoritesAction: (favorite) => ({ type: actionTypes.removeFavoritesAction, favorite }),
    toggleCollapseLeagueAction: (league) => ({ type: actionTypes.toggleCollapseLeagueAction, league }),
}

export const rootReducer = persistReducer(persistConfig, (state = INITIAL_STATE, action) => {
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
                    favorite.sport != action.favorite.sport ||
                    favorite.team.name != action.favorite.team.name)
            };

        case actionTypes.toggleCollapseLeagueAction:
            const collapsed = state.collapsedLeagues.find(league => league == action.league);
            return {
                ...state,
                collapsedLeagues: collapsed ? state.collapsedLeagues.filter(league => league != action.league) : [...state.collapsedLeagues, action.league]
            };

        default:
            return state;
    }
});

export function* rootSaga() { }