import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Text } from '@ui-kitten/components';
import { getMatchScore } from '../../../../libs/functions';

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

export default class ScoreBoardComponent extends Component {
    render() {
        const { scores, home, away, sport } = this.props;
        const peorids = peoridPerSports[sport.name].map(item => {
            const score = getMatchScore(sport, scores, item.value);
            return { ...item, ...score };
        });
        return (
            <ScrollView horizontal style={styles.container}>
                <View>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.scoreTitle, styles.scoreTitleText]}>Scores</Text>
                        {peorids.map(item => (<Text key={item.value} style={[styles.scoreItem]}>{item.title}</Text>))}
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={[styles.scoreTitle, styles.teamTitle]}>
                            <Image
                                style={styles.teamLogoImage}
                                source={{ uri: `https://assets.b365api.com/images/team/s/${home.image_id}.png` }}
                            />
                            <Text numberOfLines={1} style={styles.teamName}>{home.name}</Text>
                        </View>
                        {peorids.map(item => (<Text key={item.value} style={[styles.scoreItem]}>{item.home_score}</Text>))}
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={[styles.scoreTitle, styles.teamTitle]}>
                            <Image
                                style={styles.teamLogoImage}
                                source={{ uri: `https://assets.b365api.com/images/team/s/${away.image_id}.png` }}
                            />
                            <Text numberOfLines={1} style={styles.teamName}>{away.name}</Text>
                        </View>
                        {peorids.map(item => (<Text key={item.value} style={[styles.scoreItem]}>{item.away_score}</Text>))}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

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
    teamLogoImage: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },
    teamName: {
        fontSize: 14,
        marginLeft: 8
    }
});