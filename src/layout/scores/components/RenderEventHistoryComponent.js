import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { LoadingIndicator } from './LoadingIndicator';
import { Text } from '@ui-kitten/components';
import { truncateString } from '../../../libs/functions';
import { format } from 'date-fns';
import TeamLogoImage from '../../../components/team-logo-image';

const RenderEventHistoryComponent = ({ event, loading }) => {
    const renderLastMatches = (title, events, team = null) => {
        return (
            <View style={styles.lastMatchesContainer}>
                <Text style={styles.lastMatchesTitle}>{title}</Text>
                {events.map(event => {
                    const { home, away, ss, time, id, league } = event;
                    if (!ss) return null;
                    const scores = ss.split('-');
                    const homeScore = parseInt(scores[0]);
                    const awayScore = parseInt(scores[1]);
                    const timeStr = format(new Date(parseInt(time) * 1000), "eee MMM dd yyyy");
                    let scoreTextStyle = styles.eventScoreTextDefault;
                    if (team) {
                        if (team.id == home.id) {
                            if (homeScore > awayScore) {
                                scoreTextStyle = styles.eventScoreTextWin;
                            } else if (homeScore < awayScore) {
                                scoreTextStyle = styles.eventScoreTextLose;
                            } else {
                                scoreTextStyle = styles.eventScoreTextDraw;
                            }
                        } else {
                            if (homeScore < awayScore) {
                                scoreTextStyle = styles.eventScoreTextWin;
                            } else if (homeScore > awayScore) {
                                scoreTextStyle = styles.eventScoreTextLose;
                            } else {
                                scoreTextStyle = styles.eventScoreTextDraw;
                            }
                        }
                    }
                    return (
                        <View style={styles.eventContainer} key={id}>
                            <Text style={styles.eventTimeText}>{timeStr}, {league.name}</Text>
                            <View style={styles.eventScoresContainer}>
                                <View style={styles.eventHomeContainer}>
                                    <TeamLogoImage image_id={home.image_id} size={16} style={null} />
                                    <Text style={[styles.eventTeamName, team && home.id == team.id ? styles.fontWeightBold : null]} numberOfLines={1}>{home.name}</Text>
                                </View>
                                <View style={[styles.eventScores]}>
                                    <Text style={[styles.eventScoreText, scoreTextStyle]}>{homeScore} : {awayScore}</Text>
                                </View>
                                <View style={styles.eventAwayContainer}>
                                    <TeamLogoImage image_id={away.image_id} size={16} style={null} />
                                    <Text style={[styles.eventTeamName, team && away.id == team.id ? styles.fontWeightBold : null]} numberOfLines={1}>{away.name}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }

    const renderContent = () => {
        if (loading) {
            return (
                <LoadingIndicator style={styles.loadingIndicator} />
            );
        }
        if (!event || !event.history) {
            return (
                <Text style={styles.noDataText}>No Data Availale.</Text>
            );
        }
        const { history, home, away } = event;
        const { h2h, home: lastHome, away: lastAway } = history;

        return (
            <View>
                <View style={styles.headerContainer}>
                    <View style={[styles.teamHeaderContainer]}>
                        <TeamLogoImage image_id={home.image_id} size={24} style={styles.teamLogoImage} />
                        <Text style={styles.teamNames}>{truncateString(home.name)}</Text>
                    </View>
                    <View style={[styles.teamHeaderContainer, styles.teamAwayHeader]}>
                        <TeamLogoImage image_id={away.image_id} size={24} style={styles.teamLogoImage} />
                        <Text style={styles.teamNames}>{truncateString(away.name)}</Text>
                    </View>
                </View>
                {renderLastMatches('Last Direct Matches', h2h)}
                {renderLastMatches(`Last Matches for ${home.name}`, lastHome, home)}
                {renderLastMatches(`Last Matches for ${away.name}`, lastAway, away)}
            </View>
        )

    }
    return (
        <ScrollView style={styles.container}>
            {renderContent()}
        </ScrollView>
    )
}

export default RenderEventHistoryComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    loadingIndicator: {
        flex: 1
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 15,
        paddingHorizontal: 10
    },
    teamLogoImage: {
        width: 24,
        height: 24,
    },
    teamHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        width: '50%',
    },
    teamAwayHeader: {
        flexDirection: 'row-reverse',
    },
    teamNames: {
        fontSize: 14,
        marginHorizontal: 10
    },
    lastMatchesContainer: {
        marginTop: 20
    },
    lastMatchesTitle: {
        fontSize: 13,
        color: '#aaa',
        textAlign: 'center',
        marginBottom: 6,
    },
    eventContainer: {
        backgroundColor: '#222',
        borderColor: '#555',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    eventTimeText: {
        fontSize: 10
    },
    eventScoresContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8
    },
    eventScores: {
        flex: 2,
        alignItems: 'center'
    },
    eventHomeContainer: {
        marginRight: 'auto',
        flexDirection: 'row',
        flex: 3,
        alignItems: 'center',
        paddingHorizontal: 6
    },
    eventAwayContainer: {
        marginLeft: 'auto',
        flexDirection: 'row-reverse',
        flex: 3,
        alignItems: 'center',
        paddingHorizontal: 6
    },
    eventTeamName: {
        fontSize: 12,
        marginHorizontal: 6
    },
    eventScoreText: {
        fontSize: 14,
        paddingHorizontal: 10,
        fontWeight: 'bold'
    },
    eventScoreTextDefault: {
        backgroundColor: '#000',
        color: '#FFF'
    },
    eventScoreTextWin: {
        backgroundColor: '#0F0',
        color: '#000'
    },
    eventScoreTextLose: {
        backgroundColor: '#F00',
    },
    eventScoreTextDraw: {
        backgroundColor: 'gold',
        color: '#000'
    },
    fontWeightBold: {
        fontWeight: 'bold'
    }
});
