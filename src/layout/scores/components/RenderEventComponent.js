import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text } from '@ui-kitten/components';
import { getMatchScore, getStatusString, getTimeString, ordinal_suffix_of } from '../../../libs/functions';
import TeamLogoImage from '../../../components/team-logo-image';

export default class RenderEventComponent extends PureComponent {
    onItemPress = () => {
        const { navigation, event } = this.props;
        if (navigation)
            navigation.navigate('EventDetail', { event: event })
    }

    render() {
        const { event } = this.props;
        if (!event) return null;

        const { home, away, time, time_status, timer, sport, scores } = event;
        const time_str = getTimeString(timer, time, time_status);
        const { home_score, away_score } = getMatchScore(sport, scores, 'game');
        const { status_class, status_text } = getStatusString(time_status, timer, sport);

        return (
            <TouchableOpacity
                style={styles.eventItem}
                activeOpacity={0.6}
                onPress={() => this.onItemPress()}>
                <View style={styles.eventItemDetail}>
                    <View style={styles.eventItemTeam}>
                        <TeamLogoImage image_id={home.image_id} size={20} style={styles.teamLogoImage} />
                        <Text style={styles.eventItemTeamName} numberOfLines={1}>{home.name}</Text>
                        <Text style={styles.eventItemTeamScore}>{home_score}</Text>
                    </View>
                    <View style={styles.eventItemTeam}>
                        <TeamLogoImage image_id={away.image_id} size={20} style={styles.teamLogoImage} />
                        <Text style={styles.eventItemTeamName} numberOfLines={1}>{away.name}</Text>
                        <Text style={styles.eventItemTeamScore}>{away_score}</Text>
                    </View>
                </View>
                <View style={styles.eventItemStatus}>
                    {time_str && <Text style={[status_class, styles.eventItemStatusText]}>{time_str}</Text>}
                    {status_text &&
                        <Text style={[status_class, styles.eventItemStatusText]} numberOfLines={1}>{status_text}</Text>}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    eventItem: {
        flexDirection: 'row',
        marginHorizontal: 10,
        borderBottomColor: '#222',
        borderBottomWidth: 1,
        paddingVertical: 4
    },
    eventItemStatus: {
        flex: 2,
        justifyContent: 'center'
    },
    eventItemStatusText: {
        fontSize: 12,
        marginVertical: 3,
        textAlign: 'right',
        overflow: 'hidden'
    },
    eventItemDetail: {
        flex: 7,
    },
    eventItemTeam: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2
    },
    teamLogoImage: {
        flex: 1
    },
    eventItemTeamName: {
        flex: 5,
        fontSize: 15,
        fontWeight: '400',
        marginLeft: 10
    },
    eventItemTeamScore: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'right'
    }
});
