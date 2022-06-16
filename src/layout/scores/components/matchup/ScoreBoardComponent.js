import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Text } from '@ui-kitten/components';
import { getMatchScore } from '../../../../libs/functions';
import TeamLogoImage from '../../../../components/team-logo-image';

const peoridPerSports = {
    "Soccer": [
        { title: '1', value: '1st_half' },
        { title: '2', value: '2nd_half' },
        { title: 'T', value: 'game' },
    ],
    "Basketball": [
        { title: '1', value: '1st_quarter' },
        { title: '2', value: '2nd_quarter' },
        { title: '3', value: '3rd_quarter' },
        { title: '4', value: '4th_quarter' },
        { title: 'T', value: 'game' },
    ],
    "American Football": [
        { title: '1', value: '1st_quarter' },
        { title: '2', value: '2nd_quarter' },
        { title: '3', value: '3rd_quarter' },
        { title: '4', value: '4th_quarter' },
        { title: 'T', value: 'game' },
    ],
    "Baseball": [
        { title: '1', value: '1st_inning' },
        { title: '2', value: '2nd_inning' },
        { title: '3', value: '3rd_inning' },
        { title: '4', value: '4th_inning' },
        { title: '5', value: '5th_inning' },
        { title: '6', value: '6th_inning' },
        { title: '7', value: '7th_inning' },
        { title: '8', value: '8th_inning' },
        { title: '9', value: '9th_inning' },
        { title: 'T', value: 'game' },
    ],
    "Ice Hockey": [
        { title: '1', value: '1st_peorid' },
        { title: '2', value: '2nd_peorid' },
        { title: '3', value: '3rd_peorid' },
        { title: 'T', value: 'game' },
    ]
}

const ScoreBoardComponent = ({ scores, home, away, sport, ss }) => {
    var peorids = peoridPerSports[sport.name].map(item => {
        if (sport.name != 'Ice Hockey') ss = '';
        const score = getMatchScore(sport, scores, item.value, ss);
        return { ...item, ...score };
    });

    var sum_home_score = 0;
    var sum_away_score = 0;
    for(let i = 0; i < peorids.length - 1; i++) {
        sum_home_score += parseInt(peorids[i].home_score);
        sum_away_score += parseInt(peorids[i].away_score);
    }
    if (ss != '') {
        const ot_home_score = ss.split('-')[0];
        const ot_away_score = ss.split('-')[1];
        if (sum_home_score != ot_home_score || sum_away_score != ot_away_score) {

            peorids.splice(peorids.length - 1, 0, {
                title: 'O',
                value: 'over_time',
                home_score: ot_home_score - sum_home_score,
                away_score: ot_away_score - sum_away_score
            })
        }
    }

    return (
        <ScrollView horizontal style={styles.container}>
            <View>
                <View style={styles.rowContainer}>
                    <Text style={[styles.scoreTitle, styles.scoreTitleText]}>Scores</Text>
                    {peorids.map(item => (<Text key={item.value} style={[styles.scoreItem]}>{item.title}</Text>))}
                </View>
                <View style={styles.rowContainer}>
                    <View style={[styles.scoreTitle, styles.teamTitle]}>
                        <TeamLogoImage image_id={home.image_id} size={16} style={null} />
                        <Text numberOfLines={1} style={styles.teamName}>{home.name}</Text>
                    </View>
                    {peorids.map(item => (<Text key={item.value} style={[styles.scoreItem]}>{item.home_score}</Text>))}
                </View>
                <View style={styles.rowContainer}>
                    <View style={[styles.scoreTitle, styles.teamTitle]}>
                        <TeamLogoImage image_id={away.image_id} size={16} style={null} />
                        <Text numberOfLines={1} style={styles.teamName}>{away.name}</Text>
                    </View>
                    {peorids.map(item => (<Text key={item.value} style={[styles.scoreItem]}>{item.away_score}</Text>))}
                </View>
            </View>
        </ScrollView>
    )
}

export default ScoreBoardComponent;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingRight: 10,
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderColor: '#4445'
    },
    rowContainer: {
        flexDirection: 'row',
        paddingVertical: 4
    },
    scoreTitle: {
        width: 200
    },
    scoreItem: {
        width: 24,
        fontSize: 14
    },
    scoreTitleText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    teamTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    teamName: {
        fontSize: 14,
        marginLeft: 8
    }
});
