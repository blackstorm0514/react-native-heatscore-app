import React, { PureComponent } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { getMatchScore, getPickName, getStatusString, getTimeString, getWinLoss } from '../../../libs/functions';
import TeamLogoImage from '../../../components/team-logo-image';

const screenWidth = Dimensions.get('screen').width;

export default class ScoreCardComponent extends PureComponent {
    render() {
        const { card } = props;
        const { event: { home, away, scores, timer, sport, time_status }, type, team, timeline, points, time } = card;
        const { home_score, away_score } = getMatchScore(sport, scores, timeline);
        const time_str = getTimeString(timer, time, time_status);
        const { status_text } = getStatusString(time_status, timer, sport);
        const winLoss = getWinLoss(home_score, away_score, team, type, points);
        let winLossStyle = null;
        if (winLoss == 'win') winLossStyle = styles.winContainer;
        if (winLoss == 'lose') winLossStyle = styles.loseContainer;
        if (winLoss == 'draw') winLossStyle = styles.drawContainer;
        const pickName = getPickName(home, away, team, type, points, timeline);
        const { onDeleteCard, showMode } = this.props;

        return (
            <ScrollView
                horizontal={true}
                style={styles.container}
                showsHorizontalScrollIndicator={false}>
                <View style={[styles.eventWrapper, winLossStyle]}>
                    <Text style={styles.eventPickText}>{pickName}</Text>
                    <View style={styles.eventContainer}>
                        <View style={styles.eventItemDetail}>
                            <View style={styles.eventItemTeam}>
                                <TeamLogoImage image_id={home.image_id} size={16} style={styles.teamLogoImage} />
                                <Text style={styles.eventItemTeamName} numberOfLines={1}>{home.name}</Text>
                                <Text style={styles.eventItemTeamScore}>{home_score}</Text>
                            </View>
                            <View style={styles.eventItemTeam}>
                                <TeamLogoImage image_id={away.image_id} size={16} style={styles.teamLogoImage} />
                                <Text style={styles.eventItemTeamName} numberOfLines={1}>{away.name}</Text>
                                <Text style={styles.eventItemTeamScore}>{away_score}</Text>
                            </View>
                            {time_status == 3 && showMode == 'total' && <>
                                {type == 'total' && <View style={styles.totalPointContainer}>
                                    <Text style={{ flex: 2 }} />
                                    <Text style={styles.totalPointTitle} numberOfLines={1}>Total Points</Text>
                                    <Text style={styles.totalPointScore}>{away_score + home_score}</Text>
                                </View>}
                                {type == 'total_home' && <View style={styles.totalPointContainer}>
                                    <Text style={{ flex: 2 }} />
                                    <Text style={styles.totalPointTitle} numberOfLines={1}>Total Points</Text>
                                    <Text style={styles.totalPointScore}>{home_score}</Text>
                                </View>}
                                {type == 'total_away' && <View style={styles.totalPointContainer}>
                                    <Text style={{ flex: 2 }} />
                                    <Text style={styles.totalPointTitle} numberOfLines={1}>Total Points</Text>
                                    <Text style={styles.totalPointScore}>{away_score}</Text>
                                </View>}
                            </>}
                        </View>
                        <View style={styles.eventItemStatus}>
                            <Text style={styles.eventItemStatusText}>{time_str}</Text>
                            <Text style={styles.eventItemStatusText} numberOfLines={1}>{status_text}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.deleteButtonContainer}
                    onPress={() => onDeleteCard(card._id)}
                    activeOpacity={0.8}>
                    <FontAwesomeIcon name='trash' size={32} color='white' />
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 1,
    },
    eventWrapper: {
        paddingTop: 2,
        borderLeftWidth: 6,
        borderLeftColor: '#000',
        paddingBottom: 5,
        backgroundColor: '#202020',
    },
    winContainer: {
        borderLeftColor: '#0F0',
        backgroundColor: '#89FC991A',
    },
    loseContainer: {
        borderLeftColor: '#F00',
        backgroundColor: '#FFD7D726',
    },
    drawContainer: {
        borderLeftColor: '#FFF',
    },
    eventPickText: {
        color: 'white',
        marginLeft: 15,
        fontSize: 12,
        marginTop: 5
    },
    eventContainer: {
        width: screenWidth - 6,
        flexDirection: 'row',
    },
    deleteButtonContainer: {
        backgroundColor: '#F00',
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventItemDetail: {
        flex: 5,
        paddingLeft: 10
    },
    eventItemTeam: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4
    },
    teamLogoImage: {
        flex: 1
    },
    eventItemTeamName: {
        flex: 6,
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 10
    },
    eventItemTeamScore: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold'
    },
    eventItemStatus: {
        flex: 2,
        justifyContent: 'center',
        paddingRight: 10,
    },
    eventItemStatusText: {
        fontSize: 13,
        marginVertical: 5,
        textAlign: 'right',
        overflow: 'hidden'
    },
    totalPointContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2
    },
    totalPointTitle: {
        flex: 5,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#E10032',
        fontStyle: 'italic'
    },
    totalPointScore: {
        flex: 1,
        color: '#E10032',
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
})