import { put, takeLatest, select } from "redux-saga/effects";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['collapsedLeagues', 'suspendTill', 'chatTexts']
};

const textTimeLimit = 30 * 1000;
const textLimit = 9;
const suspendTimeOut = 5 * 60 * 1000;
const imageLimit = 2;
const imageTimeOut = 5 * 60 * 1000;

const INITIAL_STATE = {
    user: null,
    favorites: [],
    collapsedLeagues: [],
    chatTexts: [],
    suspendTillText: null,
    chatImages: [],
    suspendTillImage: null,
};

export const actionTypes = {
    setUserAction: 'SET_USER_ACTION',
    setFavoritesAction: 'SET_FAVORITES_ACTION',
    addFavoritesAction: 'ADD_FAVORITES_ACTION',
    removeFavoritesAction: 'REMOVE_FAVORITES_ACTION',
    toggleCollapseLeagueAction: 'TOGGLE_COLLAPSE_LEAGUE_ACTION',
    addChatItemAction: 'ADD_CHAT_ITEM_ACTION',
}

export const actions = {
    setUserAction: (user) => ({ type: actionTypes.setUserAction, user }),
    setFavoritesAction: (favorites) => ({ type: actionTypes.setFavoritesAction, favorites }),
    addFavoritesAction: (favorite) => ({ type: actionTypes.addFavoritesAction, favorite }),
    removeFavoritesAction: (favorite) => ({ type: actionTypes.removeFavoritesAction, favorite }),
    toggleCollapseLeagueAction: (league) => ({ type: actionTypes.toggleCollapseLeagueAction, league }),
    addChatItemAction: (chat) => ({ type: actionTypes.addChatItemAction, chat }),
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

        case actionTypes.addChatItemAction:
            if (action.chat.type == 'text') {
                if (state.chatTexts.length < textLimit) {
                    return {
                        ...state,
                        chatTexts: [new Date(), ...state.chatTexts],
                    }
                } else {
                    // Check Suspend
                    const lastTime = new Date();
                    const firstTime = new Date(state.chatTexts[textLimit - 1]);
                    let suspendTillText = null;
                    if (firstTime && (lastTime.getTime() - firstTime.getTime()) < textTimeLimit) {
                        suspendTillText = new Date(suspendTimeOut + lastTime.getTime());
                    }
                    return {
                        ...state,
                        suspendTillText: suspendTillText,
                        chatTexts: [lastTime, ...state.chatTexts].slice(0, textLimit),
                    }
                }
            } else {
                if (state.chatImages.length < imageLimit) {
                    return {
                        ...state,
                        chatImages: [new Date(), ...state.chatImages],
                    }
                } else {
                    // Check Suspend
                    const firstTime = new Date(state.chatImages[imageLimit - 1]);
                    const suspendTillImage = new Date(imageTimeOut + firstTime.getTime());
                    return {
                        ...state,
                        suspendTillImage: suspendTillImage,
                        chatImages: [new Date(), ...state.chatImages].slice(0, imageLimit),
                    }
                }
            }
        default:
            return state;
    }
});

export function* rootSaga() { }