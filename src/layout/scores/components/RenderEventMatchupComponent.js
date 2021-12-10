import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { LoadingIndicator } from './LoadingIndicator';
import { Text } from '@ui-kitten/components';
import { getMatchScore, getStatusString } from '../../../libs/functions';
import ScoreBoardComponent from './matchup/ScoreBoardComponent';
import GameDetailComponent from './matchup/GameDetailComponent';
import GameEventsComponent from './matchup/GameEventsComponent';
import GameStatsComponent from './matchup/GameStatsComponent';

export default class RenderEventMatchupComponent extends Component {
    renderContent = () => {
        const { event, loading } = this.props;
        if (loading) {
            return (
                <LoadingIndicator style={styles.loadingIndicator} />
            );
        }
        if (!event) {
            return (
                <Text style={styles.noDataText}>No Data Availale.</Text>
            );
        }
        const { home, away, extra, events, scores, time_status, sport, timer, stats } = event;
        const { status_text, status_class } = getStatusString(time_status, timer, sport);
        const { home_score, away_score } = getMatchScore(sport, scores, 'game');
        return (
            <View>
                <View style={styles.mainBoard}>
                    {status_text && <Text style={[styles.statusText, status_class]}>{status_text}</Text>}
                    <View style={styles.mainBoardItem}>
                        <Image
                            style={styles.mainTeamLogoImage}
                            source={{ uri: `https://assets.b365api.com/images/team/b/${home.image_id}.png` }}
                        />
                        <Text style={styles.mainBoardTeamName}>{home.name}</Text>
                        <Text style={styles.mainBoardScore}>{home_score}</Text>
                    </View>
                    <View style={styles.mainBoardItem}>
                        <Image
                            style={styles.mainTeamLogoImage}
                            source={{ uri: `https://assets.b365api.com/images/team/b/${away.image_id}.png` }}
                        />
                        <Text style={styles.mainBoardTeamName}>{away.name}</Text>
                        <Text style={styles.mainBoardScore}>{away_score}</Text>
                    </View>
                </View>
                {scores && <ScoreBoardComponent
                    home={home}
                    away={away}
                    scores={scores}
                    sport={sport} />}
                {events && events.length > 0 && <GameEventsComponent
                    home={home}
                    away={away}
                    events={events}
                    sport={sport} />}
                {stats && <GameStatsComponent
                    home={home}
                    away={away}
                    stats={stats}
                    sport={sport} />}
                {extra && <GameDetailComponent
                    home={home}
                    away={away}
                    extra={extra} />}
            </View>
        )
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                {this.renderContent()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    loadingIndicator: {
        marginTop: 40,
        // flex: 1,
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    },
    mainBoard: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#4445'
    },
    statusText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    mainBoardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    mainTeamLogoImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    mainBoardTeamName: {
        fontSize: 16,
        marginLeft: 14,
        fontWeight: 'bold'
    },
    mainBoardScore: {
        fontSize: 30,
        marginLeft: 'auto',
        fontWeight: 'bold'
    }
});
