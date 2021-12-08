import { getSoccerEventIcons } from "./getSoccerEventIcons";

export const getEventIcons = (sport, text) => {
    switch (sport.name) {
        case 'Soccer':
            return getSoccerEventIcons(text);
        default:
            return null;
    }
}