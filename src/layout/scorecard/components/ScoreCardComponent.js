import React, { PureComponent } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image } from 'react-native';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { getMatchScore, getPickName, getStatusString, getTimeString, getWinLoss } from '../../../libs/functions';

const screenWidth = Dimensions.get('screen').width;

export default class ScoreCardComponent extends PureComponent {
    constructor(props) {
        super(props);
        const { card } = props;
        const { event: { home, away, scores, timer, sport, time_status }, type, team, timeline, points, time } = card;
        const { home_score, away_score } = getMatchScore(sport, scores, timeline);

        const time_str = getTimeString(sport, timer, time, time_status);
        const { status_text } = getStatusString(time_status, timer);

        const winLoss = getWinLoss(home_score, away_score, team, type, points);
        let winLossStyle = null;
        if (winLoss == 'win') winLossStyle = styles.winContainer;
        if (winLoss == 'lose') winLossStyle = styles.loseContainer;
        this.state = {
            card_id: card._id,
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
        };
    }

    render() {
        const { pickName, winLossStyle,
            home, away,
            home_image, away_image,
            home_score, away_score,
            time, status, card_id
        } = this.state;
        const { onDeleteCard } = this.props;

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
                                <Image
                                    style={styles.teamLogoImage}
                                    source={{ uri: `https://assets.b365api.com/images/team/m/${home_image}.png` }}
                                />
                                <Text style={styles.eventItemTeamName} numberOfLines={1}>{home}</Text>
                                <Text style={styles.eventItemTeamScore}>{home_score}</Text>
                            </View>
                            <View style={styles.eventItemTeam}>
                                <Image
                                    style={styles.teamLogoImage}
                                    source={{ uri: `https://assets.b365api.com/images/team/m/${away_image}.png` }}
                                />
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
                <TouchableOpacity style={styles.deleteButtonContainer}
                    onPress={() => onDeleteCard(card_id)}
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
        backgroundColor: '#101010',
    },
    eventWrapper: {
        paddingTop: 2,
        borderLeftWidth: 4,
        borderLeftColor: '#FFF',
    },
    winContainer: {
        borderLeftColor: 'green'
    },
    loseContainer: {
        borderLeftColor: 'red'
    },
    eventPickText: {
        color: 'white',
        marginLeft: 15,
        fontSize: 12,
    },
    eventContainer: {
        width: screenWidth,
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
    },
    eventItemTeam: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4
    },
    teamLogoImage: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        flex: 1
    },
    eventItemTeamName: {
        flex: 6,
        fontSize: 14,
        fontWeight: 'bold',
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
        paddingRight: 8,
    },
    eventItemStatusText: {
        fontSize: 13,
        marginVertical: 5,
        textAlign: 'right',
        overflow: 'hidden'
    },
})