import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { getBaseballMatchScore } from './getBaseballMatchScore';
import { getBasketballMatchScore } from './getBasketballMatchScore';
import { getFootballMatchScore } from './getFootballMatchScore';
import { getIceHockeyMatchScore } from './getIceHockeyScore';
import { getSoccerMatchScore } from './getSoccerMatchScore';
import { format } from 'date-fns';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function truncateString(text, length = 10) {
    if (text.length > length) {
        text = text.substring(0, length) + "...";
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

export function getTimeString(timer, time, time_status) {
    if (["2", "3"].includes(time_status)) return null;
    if (time_status == "1") {
        if (timer) {
            let min = Number(timer.tm);
            let sec = Number(timer.ts);
            return `${min > 9 ? min : '0' + min}:${sec > 9 ? sec : '0' + sec}`
        }
        return null;
    }
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
            pickName += (team == 'home' ? 'Over' : 'Under') + ' ' + points + ' : Total';
            break;
        case 'spread':
            pickName += (team == 'home' ? home.name : away.name) + ' ' + (points > 0 ? `+${points}` : points) + ' : Spread';
            break;
        case 'moneyline':
            pickName += (team == 'home' ? home.name : away.name) + ' : Moneyline';
            break;
    }
    pickName += ' (' + getTimeLineName(timeline) + ')';
    return pickName;
}

export function ordinal_suffix_of(i) {
    var j = i % 10;
    if (j == 1) return i + "st";
    if (j == 2) return i + "nd";
    if (j == 3) return i + "rd";
    return i + "th";
}

export function getStatusString(time_status, timer, sport) {
    let status_text = null;
    let status_class = styles.eventItemStatusNotStarted;
    switch (time_status) {
        case "1":
            status_text = null;
            switch (sport.name) {
                case 'Soccer':
                    status_text = timer ? ('H' + timer.md) : null;
                    break;
                case 'American Football':
                    status_text = timer ? ('Q' + timer.q) : null;
                    break;
                case 'Basketball':
                    status_text = timer ? ('Q' + timer.q) : null;
                    break;
                case 'Ice Hockey':
                    status_text = timer ? ('P' + timer.q) : null;
                    break;
                case 'Baseball':
                default:
                    break;
            }
            status_class = styles.eventItemStatusInPlay;
            break;
        case "2":
            status_text = 'TBA';
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
            else if (home_score + away_score < points) winner = 'away';
            return winner == team ? 'win' : 'lose';
        case 'moneyline':
        default:
            if (home_score > away_score) winner = 'home';
            else if (home_score < away_score) winner = 'away';
            return winner == team ? 'win' : 'lose';

    }
}

export function removeTeamNameFromEvent(event, team) {
    event = event.replace(` - ${team}`, '');
    event = event.replace(` -  ${team}`, '');
    event = event.replace(` ${team}`, '');

    event = event.replace(` - (${team})]`, '');
    event = event.replace(` -  (${team})]`, '');
    event = event.replace(` (${team})]`, '');

    event = event.replace(` - (${team})`, '');
    event = event.replace(` -  (${team})`, '');
    event = event.replace(` (${team})`, '');
    return event;
}

export function formatDateStr(time) {
    return format(new Date(time), "eee MMM dd yyyy, HH:mm aa");
}

const iconName = {
    "All": "sports",
    "Football": "sports-football",
    "American Football": "sports-football",
    "Basketball": "sports-basketball",
    "Hockey": "sports-hockey",
    "Baseball": "sports-baseball",
    "Soccer": "sports-soccer",
    "Tennis": "sports-tennis",
    "Boxing": "sports-mma",
    "hide": "keyboard-arrow-down",
    "show": "keyboard-arrow-up",
}

const logoImages = {
    'NFL': require('../assets/images/league_logos/nfl.png'),
    'NFL Preseason': require('../assets/images/league_logos/nfl.png'),
    "NBA": require('../assets/images/league_logos/nba.png'),
    'NCAAF': require('../assets/images/league_logos/ncaaf.png'),
    'CFL': require('../assets/images/league_logos/cfl.png'),
    'NCAAB': require('../assets/images/league_logos/ncaab.png'),
    'UEFA CL': require('../assets/images/league_logos/uefa.png'),
    'NHL': require('../assets/images/league_logos/nhl.png')
}

export function getSportsIcon(title, color, size) {
    if (iconName[title]) {
        return (
            <MaterialIcons name={iconName[title]}
                size={size} color={color ? color : "white"}
            />
        )
    }
    if (logoImages[title]) {
        return (
            <Image source={logoImages[title]}
                style={[styles.leagueLogoImage, { width: size, height: size }]}
            />
        )
    }
    return null;
}

const styles = StyleSheet.create({
    eventItemStatusInPlay: {
        color: '#F00'
    },
    eventItemStatusToBeConfirmed: {
        color: '#dda039'
    },
    eventItemStatusEnded: {
        color: '#FFF'
    },
    eventItemStatusOther: {
        color: '#FF0'
    },
    eventItemStatusNotStarted: {
        color: '#FFF'
    },
    leagueLogoImage: {
        resizeMode: 'contain'
    }
})