import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { LoadingIndicator } from './LoadingIndicator';
import { Text } from '@ui-kitten/components';
import { truncateString } from '../../../libs/functions';
import { format } from 'date-fns';

export default class RenderEventHistoryComponent extends Component {
    renderLastMatches = (title, events, team = null) => {
        return (
            <View style={styles.lastMatchesContainer}>
                <Text style={styles.lastMatchesTitle}>{title}</Text>
                {events.map(event => {
                    const { home, away, ss, time, id, league } = event;
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
                                    <Image
                                        style={styles.eventTeamLogoImage}
                                        source={{ uri: `https://assets.b365api.com/images/team/m/${home.image_id}.png` }}
                                    />
                                    <Text style={[styles.eventTeamName, team && home.id == team.id ? styles.fontWeightBold : null]} numberOfLines={1}>{home.name}</Text>
                                </View>
                                <View style={[styles.eventScores]}>
                                    <Text style={[styles.eventScoreText, scoreTextStyle]}>{homeScore} : {awayScore}</Text>
                                </View>
                                <View style={styles.eventAwayContainer}>
                                    <Image
                                        style={styles.eventTeamLogoImage}
                                        source={{ uri: `https://assets.b365api.com/images/team/m/${away.image_id}.png` }}
                                    />
                                    <Text style={[styles.eventTeamName, team && away.id == team.id ? styles.fontWeightBold : null]} numberOfLines={1}>{away.name}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }

    renderContent = () => {
        const { event, loading } = this.props;
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

        // const result = {
        //     home: 0,
        //     draw: 0,
        //     away: 0
        // }
        // for (const event of h2h) {
        //     const { ss, home: eventHome, away: eventAway } = event;
        //     const scores = ss.split('-');
        //     const homeScore = parseInt(scores[0]);
        //     const awayScore = parseInt(scores[1]);
        //     if (home.id == eventHome.id) {
        //         if (homeScore > awayScore) {
        //             result.home++;
        //         } else if (homeScore < awayScore) {
        //             result.away++;
        //         } else {
        //             result.draw++;
        //         }
        //     } else {
        //         if (homeScore > awayScore) {
        //             result.away++;
        //         } else if (homeScore < awayScore) {
        //             result.home++;
        //         } else {
        //             result.draw++;
        //         }
        //     }
        // }

        return (
            <View>
                <View style={styles.headerContainer}>
                    <View style={[styles.teamHeaderContainer]}>
                        <Image
                            style={styles.teamLogoImage}
                            source={{ uri: `https://assets.b365api.com/images/team/m/${home.image_id}.png` }}
                        />
                        <Text style={styles.teamNames}>{truncateString(home.name)}</Text>
                    </View>
                    <View style={[styles.teamHeaderContainer, styles.teamAwayHeader]}>
                        <Image
                            style={styles.teamLogoImage}
                            source={{ uri: `https://assets.b365api.com/images/team/m/${away.image_id}.png` }}
                        />
                        <Text style={styles.teamNames}>{truncateString(away.name)}</Text>
                    </View>
                </View>
                {this.renderLastMatches('Last Direct Matches', h2h)}
                {this.renderLastMatches(`Last Matches for ${home.name}`, lastHome, home)}
                {this.renderLastMatches(`Last Matches for ${away.name}`, lastAway, away)}
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
    eventTeamLogoImage: {
        width: 16,
        height: 16
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
