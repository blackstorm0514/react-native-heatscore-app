import React, { PureComponent } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image } from 'react-native';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { getMatchScore, getPickName, getStatusString, getTimeString, getWinLoss } from '../../../libs/functions';
import TeamLogoImage from '../../../components/team-logo-image';

const screenWidth = Dimensions.get('screen').width;

export default class ScoreCardComponent extends PureComponent {
    constructor(props) {
        super(props);
        const { event } = props;
        const { home, away, scores, timer, sport, time_status, scorecard: { type, team, timeline, points, time } } = event;
        const { home_score, away_score } = getMatchScore(sport, scores, timeline);

        const time_str = getTimeString(timer, time, time_status);
        const { status_text } = getStatusString(time_status, timer, sport);

        const winLoss = getWinLoss(home_score, away_score, team, type, points);
        let winLossStyle = null;
        if (winLoss == 'win') winLossStyle = styles.winContainer;
        if (winLoss == 'lose') winLossStyle = styles.loseContainer;
        this.state = {
            card_id: event._id,
            pickName: getPickName(home, away, team, type, points, timeline),
            winLoss: winLoss,
            winLossStyle: winLossStyle,
            home: home.name,
            away: away.name,
            home_image: home.image_id,
            away_image: away.image_id,
            home_score: home_score,
            away_score: away_score,
            time: time_str,
            status: status_text,
            type: type,
        };
    }

    onItemPress = () => {
        const { navigation, event } = this.props;
        if (navigation) navigation.navigate('EventDetail', { event: event });
    };

    render() {
        const { pickName, winLossStyle,
            home, away,
            home_image, away_image,
            home_score, away_score,
            time, status
        } = this.state;

        return (
            <TouchableOpacity style={styles.container}
                activeOpacity={0.8}
                onPress={this.onItemPress}>
                <View style={[styles.eventWrapper, winLossStyle]}>
                    <Text style={styles.eventPickText}>{pickName}</Text>
                    <View style={styles.eventContainer}>
                        <View style={styles.eventItemDetail}>
                            <View style={styles.eventItemTeam}>
                                <TeamLogoImage image_id={home_image} size={16} style={styles.teamLogoImage} />
                                <Text style={styles.eventItemTeamName} numberOfLines={1}>{home}</Text>
                                <Text style={styles.eventItemTeamScore}>{home_score}</Text>
                            </View>
                            <View style={styles.eventItemTeam}>
                                <TeamLogoImage image_id={away_image} size={16} style={styles.teamLogoImage} />
                                <Text style={styles.eventItemTeamName} numberOfLines={1}>{away}</Text>
                                <Text style={styles.eventItemTeamScore}>{away_score}</Text>
                            </View>
                        </View>
                        <View style={styles.eventItemStatus}>
                            <Text style={styles.eventItemStatusText}>{time}</Text>
                            <Text style={styles.eventItemStatusText} numberOfLines={1}>{status}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
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
        borderLeftColor: '#FFF',
        paddingBottom: 5,
        backgroundColor: '#121212',
    },
    winContainer: {
        borderLeftColor: 'green',
        backgroundColor: '#89FC991A',
    },
    loseContainer: {
        borderLeftColor: 'red',
        backgroundColor: '#FFD7D726',
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
        backgroundColor: 'red',
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