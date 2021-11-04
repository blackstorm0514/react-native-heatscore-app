import { format, addDays, subDays } from 'date-fns';
import { put, takeLatest, select } from "redux-saga/effects";
import { getEvent } from './services';

const tabs = [];
let today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();
today = new Date(year, month, day);

const events = [];
for (let i = 7; i > 0; i--) {
    const date = subDays(today, i);
    const tab = format(date, "MMM dd");
    tabs.push({ key: tab, title: tab, date: date });
    events.push({ key: tab, loading: false, favorites: null, data: null });
}
tabs.push({ key: 'Today', title: 'Today', date: today });
events.push({ key: 'Today', loading: false, favorites: null, data: null });
for (let i = 1; i < 8; i++) {
    const date = addDays(today, i);
    const tab = format(date, "MMM dd");
    tabs.push({ key: tab, title: tab, date: date });
    events.push({ key: tab, loading: false, favorites: null, data: null });
}

const INITIAL_STATE = {
    tabs: tabs,
    events: events
};

export const actionTypes = {
    getEventAction: 'GET_EVENT_ACTION',
    getEventSuccess: 'GET_EVENT_SUCCESS',
}

export const actions = {
    getEventAction: (key) => ({ type: actionTypes.getEventAction, key: key }),
    getEventSuccess: (key, data) => ({ type: actionTypes.getEventSuccess, key, data }),
}

export const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.getEventAction:
            return {
                ...state,
                events: state.events.map(event => {
                    if (event.key == action.key) {
                        return {
                            ...event,
                            loading: true
                        }
                    }
                    return event;
                })
            }
        case actionTypes.getEventSuccess:
            return {
                ...state,
                events: state.events.map(event => {
                    if (event.key == action.key) {
                        return {
                            ...event,
                            loading: false,
                            ...action.data
                        }
                    }
                    return event;
                })
            }
        default:
            return state;
    }
};

export function* rootSaga() {
    yield takeLatest(actionTypes.getEventAction, function* getEventSaga(action) {
        try {
            const tabs = yield select((state) => state.tabs);
            const tab = tabs.find(tab => tab.key == action.key);
            if (!tab)
                return yield put(actions.getEventSuccess(action.key, { favorites: null, data: null }));
            const { data } = yield getEvent(tab.date);
            yield put(actions.getEventSuccess(action.key, data));
        } catch (error) {
            yield put(actions.getEventSuccess(action.key, { favorites: null, data: null }));
        }
    })
}