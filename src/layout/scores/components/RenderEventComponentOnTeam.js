import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text } from '@ui-kitten/components';
import { formatDateStr, getMatchScore, getStatusString, getTimeString, ordinal_suffix_of } from '../../../libs/functions';
import TeamLogoImage from '../../../components/team-logo-image';

export default class RenderEventComponentOnTeam extends PureComponent {
    onItemPress = () => {
        const { navigation, event } = this.props;
        if (navigation)
            navigation.navigate('EventDetail', { event: event })
    }

    render() {
        const { event } = this.props;
        if (!event) return null;

        const { home, away, time, league } = event;
        const time_str = formatDateStr(time);

        return (
            <TouchableOpacity
                style={styles.eventItem}
                activeOpacity={0.6}
                onPress={() => this.onItemPress()}>
                <Text style={styles.eventLeagueName}>{league.name}</Text>
                <View style={styles.eventItemDetail}>
                    <View style={styles.eventItemTeam}>
                        <TeamLogoImage image_id={home.image_id} size={20} style={styles.teamLogoImage} />
                        <Text style={styles.eventItemTeamName} numberOfLines={1}>{home.name}</Text>
                    </View>
                    <View style={styles.eventItemTeam}>
                        <TeamLogoImage image_id={away.image_id} size={20} style={styles.teamLogoImage} />
                        <Text style={styles.eventItemTeamName} numberOfLines={1}>{away.name}</Text>
                    </View>
                </View>
                <Text style={styles.eventItemStatusText}>{time_str}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    eventItem: {
        marginHorizontal: 10,
        borderColor: '#222',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingVertical: 4
    },
    eventItemStatusText: {
        fontSize: 12,
        marginVertical: 3,
        color: '#999',
        marginLeft: 10
    },
    eventLeagueName: {
        fontSize: 12,
        marginVertical: 3,
        color: '#FFF',
    },
    eventItemDetail: {
        flexDirection: 'row'
    },
    eventItemTeam: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
        flex: 1
    },
    teamLogoImage: {
        flex: 1
    },
    eventItemTeamName: {
        flex: 5,
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 10
    },
});
