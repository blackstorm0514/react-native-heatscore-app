import { StyleSheet } from 'react-native';
import { getBaseballMatchScore } from './getBaseballMatchScore';
import { getBasketballMatchScore } from './getBasketballMatchScore';
import { getFootballMatchScore } from './getFootballMatchScore';
import { getIceHockeyMatchScore } from './getIceHockeyScore';
import { getSoccerMatchScore } from './getSoccerMatchScore';
import { format } from 'date-fns';

export function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function truncateString(text) {
    if (text.length > 10) {
        text = text.substring(0, 10) + "...";
    }
    return text;
}

export function getTimeLineName(timeline) {
    const timelines = {
        "game": "Game",
        "5th_innings": "5th Innings",
        "1st_half": "1st Half",
        "2nd_half": "2nd Half",
        "1st_quarter": "1st Quarter",
        "2nd_quarter": "2nd Quarter",
        "3rd_quarter": "3rd Quarter",
        "4th_quarter": "4th Quarter",
        "1st_peorid": "1st Peorid",
        "2nd_peorid": "2nd Peorid",
        "3rd_peorid": "3rd Peorid",
    }
    return timelines[timeline];
}

export function getTimeString(sport, timer, time, time_status) {
    if (["2", "3"].includes(time_status)) return null;
    const time_str = format(new Date(time), "hh:mm aa");
    return time_str;
}

export function getMatchScore(sport, scores, timeline) {
    if (!sport) return { home_score: '', away_score: '' };
    switch (sport.name) {
        case 'Soccer':
            return getSoccerMatchScore(timeline, scores);
        case 'American Football':
            return getFootballMatchScore(timeline, scores);
        case 'Baseball':
            return getBaseballMatchScore(timeline, scores);
        case 'Basketball':
            return getBasketballMatchScore(timeline, scores);
        case 'Ice Hockey':
            return getIceHockeyMatchScore(timeline, scores);
    }
    return { home_score: '', away_score: '' }
}

export function getPickName(home, away, team, type, points, timeline) {
    let pickName = '';
    switch (type) {
        case 'total':
            pickName += team == 'home' ? 'Over' : 'Under';
            break;
        case 'spread':
            pickName += (team == 'home' ? home.name : away.name) + ' ' + (points > 0 ? `+${points}` : points);
            break;
        case 'moneyline':
            pickName += team == 'home' ? home.name : away.name;
            break;
    }
    pickName += ' : ' + getTimeLineName(timeline);
    return pickName;
}

export function ordinal_suffix_of(i) {
    var j = i % 10;
    if (j == 1) return i + "st";
    if (j == 2) return i + "nd";
    if (j == 3) return i + "rd";
    return i + "th";
}

export function getStatusString(time_status, timer) {
    let status_text = null;
    let status_class = styles.eventItemStatusNotStarted;
    switch (time_status) {
        case "1":
            status_text = timer ? ordinal_suffix_of(Number(timer.q ? timer.q : (timer.md ? timer.md + 1 : 0))) : 'In Play';
            status_class = styles.eventItemStatusInPlay;
            break;
        case "2":
            status_text = 'Not Confirmed';
            status_class = styles.eventItemStatusToBeConfirmed;
            break;
        case "3":
            status_text = 'Final';
            status_class = styles.eventItemStatusEnded;
            break;
        case "4":
            status_class = styles.eventItemStatusOther;
            status_text = 'Postponed';
            break;
        case "5":
            status_text = 'Cancelled';
            status_class = styles.eventItemStatusOther;
            break;
        case "6":
            status_text = 'Walkover';
            status_class = styles.eventItemStatusOther;
            break;
        case "7":
            status_text = 'Interrupted';
            status_class = styles.eventItemStatusOther;
            break;
        case "8":
            status_text = 'Abandoned';
            status_class = styles.eventItemStatusOther;
            break;
        case "9":
            status_text = 'Retired';
            status_class = styles.eventItemStatusOther;
            break;
        case "99":
            status_text = 'Removed';
            status_class = styles.eventItemStatusOther;
            break;
    }

    return { status_text, status_class };
}

export function getWinLoss(home_score, away_score, team, type, points) {
    let winner = '';
    if (typeof home_score == 'string' || typeof away_score == 'string') {
        return '';
    }

    switch (type) {
        case 'spread':
            if (team == 'home') home_score += points;
            if (team == 'away') away_score += points;
            if (home_score > away_score) winner = 'home';
            else if (home_score < away_score) winner = 'away';
            return winner == team ? 'win' : 'lose';
        case 'total':
            if (home_score + away_score > points) winner = 'home';
            else if (home_score + away_score < points) winner = 'under';
            return winner == team ? 'win' : 'lose';
        case 'moneyline':
        default:
            if (home_score > away_score) winner = 'home';
            else if (home_score < away_score) winner = 'away';
            return winner == team ? 'win' : 'lose';

    }
}

const styles = StyleSheet.create({
    eventItemStatusInPlay: {
        color: 'red'
    },
    eventItemStatusToBeConfirmed: {
        color: 'blue'
    },
    eventItemStatusEnded: {
        color: 'green'
    },
    eventItemStatusOther: {
        color: 'yellow'
    },
    eventItemStatusNotStarted: {
        color: 'white'
    },
})