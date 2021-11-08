import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { Text } from '@ui-kitten/components';
import { format } from 'date-fns';

export default class RenderEventComponent extends PureComponent {
    onItemPress = () => {
        const { navigation, event } = this.props;
        if (navigation)
            navigation.navigate('EventDetail', { event: event })
    }

    ordinal_suffix_of = (i) => {
        var j = i % 10, k = i % 100;
        if (j == 1) return i + "st";
        if (j == 2) return i + "nd";
        if (j == 3) return i + "rd";
        return i + "th";
    }

    render() {
        const { event } = this.props;
        if (!event) return null;

        const { home, away, time, time_status, ss, timer } = event;
        const time_str = format(new Date(time), "hh:mm aa");
        let score_home = '';
        let score_away = '';
        if (time_status == "3" || time_status == "1") {
            const scores = ss.split('-');
            score_home = scores[0];
            score_away = scores[1];
        }
        let status_text = null;
        let status_class = styles.eventItemStatusNotStarted;
        switch (time_status) {
            case "1":
                status_text = timer ? this.ordinal_suffix_of(Number(timer.q)) : 'In Play';
                status_class = styles.eventItemStatusInPlay;
                break;
            case "2":
                status_text = 'Not Confirmed';
                status_class = styles.eventItemStatusToBeConfirmed;
                break;
            case "3":
                status_text = 'Final';
                status_class = styles.eventItemStatusEnded;
                break;
            case "4":
                status_class = styles.eventItemStatusOther;
                status_text = 'Postponed';
                break;
            case "5":
                status_text = 'Cancelled';
                status_class = styles.eventItemStatusOther;
                break;
            case "6":
                status_text = 'Walkover';
                status_class = styles.eventItemStatusOther;
                break;
            case "7":
                status_text = 'Interrupted';
                status_class = styles.eventItemStatusOther;
                break;
            case "8":
                status_text = 'Abandoned';
                status_class = styles.eventItemStatusOther;
                break;
            case "9":
                status_text = 'Retired';
                status_class = styles.eventItemStatusOther;
                break;
            case "99":
                status_text = 'Removed';
                status_class = styles.eventItemStatusOther;
                break;
        }

        return (
            <TouchableOpacity
                style={styles.eventItem}
                activeOpacity={0.6}
                onPress={() => this.onItemPress()}>
                <View style={styles.eventItemDetail}>
                    <View style={styles.eventItemTeam}>
                        {home.image_id && <Image
                            style={styles.teamLogoImage}
                            source={{ uri: `https://assets.b365api.com/images/team/m/${home.image_id}.png` }}
                        />}
                        <Text style={styles.eventItemTeamName} numberOfLines={1}>{home.name}</Text>
                        <Text style={styles.eventItemTeamScore}>{score_home}</Text>
                    </View>
                    <View style={styles.eventItemTeam}>
                        {away.image_id && <Image
                            style={styles.teamLogoImage}
                            source={{ uri: `https://assets.b365api.com/images/team/m/${away.image_id}.png` }}
                        />}
                        <Text style={styles.eventItemTeamName} numberOfLines={1}>{away.name}</Text>
                        <Text style={styles.eventItemTeamScore}>{score_away}</Text>
                    </View>
                </View>
                <View style={styles.eventItemStatus}>
                    <Text style={[status_class, styles.eventItemStatusText]}>{time_str}</Text>
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
        paddingVertical: 10
    },
    eventItemStatus: {
        flex: 2,
        justifyContent: 'center'
    },
    eventItemStatusText: {
        fontSize: 16,
        marginVertical: 8,
        textAlign: 'right',
        overflow: 'hidden'
    },
    eventItemStatusNotStarted: {
        color: 'white'
    },
    eventItemStatusToBeConfirmed: {
        color: 'blue'
    },
    eventItemStatusEnded: {
        color: 'green'
    },
    eventItemStatusInPlay: {
        color: 'red'
    },
    eventItemStatusOther: {
        color: 'yellow'
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
        width: 30,
        height: 30,
        resizeMode: 'contain',
        flex: 1
    },
    eventItemTeamName: {
        flex: 5,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20
    },
    eventItemTeamScore: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold'
    }
});
