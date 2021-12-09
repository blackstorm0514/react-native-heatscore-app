import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const sportStatsFields = {
    'Soccer': [
        { field: 'goals', title: 'Goals' },
        { field: 'possession_rt', title: 'Possession (%)' },
        { field: 'goalattempts', title: 'Goal Attempts' },
        { field: 'attacks', title: 'Attacks' },
        { field: 'dangerous_attacks', title: 'Dangerous Attacks' },
        { field: 'on_target', title: 'Shot (on target)' },
        { field: 'off_target', title: 'Shot (off target)' },
        { field: 'shots_blocked', title: 'Shots Blocked' },
        { field: 'corners', title: 'Corners' },
        { field: 'fouls', title: 'Fouls' },
        { field: 'yellowcards', title: 'Yellow Cards' },
        { field: 'redcards', title: 'Red Cards' },
        { field: 'penalties', title: 'Penalties' },
        { field: 'injuries', title: 'Injuries' },
        { field: 'offsides', title: 'Offsides' },
        { field: 'substitutions', title: 'Substitutions' },
        { field: 'saves', title: 'Saves' },
    ]
}

export default class GameStatsComponent extends Component {
    renderStatsField = (statsField, index) => {
        const { stats } = this.props;
        if (!stats[statsField.field] || stats[statsField.field].length != 2) return null;
        const homeValue = parseInt(stats[statsField.field][0]);
        const awayValue = parseInt(stats[statsField.field][1]);
        const total = homeValue + awayValue;
        let homePercent = 50;
        let awayPercent = 50;
        if (total > 0) {
            homePercent = parseInt(homeValue / total * 100);
            awayPercent = 100 - homePercent;
        }
        return (
            <View key={statsField.field} style={styles.statsItem}>
                <View style={styles.statsTitleContainer}>
                    <Text style={styles.statsValueText}>{homeValue}</Text>
                    <Text style={styles.statsValueTitle}>{statsField.title}</Text>
                    <Text style={styles.statsValueText}>{awayValue}</Text>
                </View>
                <View style={styles.statsProgressContainer}>
                    <View style={[styles.statsProgress, styles.statsHomeProgress, { width: homePercent + '%' }]}></View>
                    <View style={[styles.statsProgress, styles.statsAwayProgress, { width: awayPercent + '%' }]}></View>
                </View>
            </View>
        )
    }

    render() {
        const { sport, stats, home, away } = this.props;
        const statsFields = sportStatsFields[sport.name];
        if (!statsFields) return null;

        return (
            <View style={styles.container}>
                <View style={styles.teamLogos}>
                    <Image
                        style={styles.mainTeamLogoImage}
                        source={{ uri: `https://assets.b365api.com/images/team/b/${home.image_id}.png` }}
                    />
                    <Text style={styles.timelineText}>Team Stats</Text>
                    <Image
                        style={styles.mainTeamLogoImage}
                        source={{ uri: `https://assets.b365api.com/images/team/b/${away.image_id}.png` }}
                    />
                </View>
                {statsFields.map(this.renderStatsField)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingRight: 10,
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderColor: '#4445',
    },
    teamLogos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    mainTeamLogoImage: {
        width: 24,
        height: 24,
    },
    timelineText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold'
    },
    statsItem: {
        marginBottom: 10
    },
    statsTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    statsValueText: {
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold'
    },
    statsValueTitle: {
        fontSize: 13,
        color: 'white',
    },
    statsProgressContainer: {
        flexDirection: 'row'
    },
    statsProgress: {
        marginHorizontal: 1,
        height: 2,
        borderRadius: 2,
        marginTop: 2
    },
    statsHomeProgress: {
        backgroundColor: 'gold',
    },
    statsAwayProgress: {
        backgroundColor: '#00D'
    }
});
