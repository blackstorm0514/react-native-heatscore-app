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

    }

    render() {
        const { navigation, event } = this.props;
        if (!event) return null;

        const { home, away, time, time_status, ss } = event;
        const time_str = format(new Date(time), "hh:mm aa");
        let score_home = '';
        let score_away = '';
        if (time_status == "3" || time_status == "1") {
            const scores = ss.split('-');
            score_home = scores[0];
            score_away = scores[1];
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
                        <Text style={styles.eventItemTeamName}>{home.name}</Text>
                        <Text style={styles.eventItemTeamScore}>{score_home}</Text>
                    </View>
                    <View style={styles.eventItemTeam}>
                        {away.image_id && <Image
                            style={styles.teamLogoImage}
                            source={{ uri: `https://assets.b365api.com/images/team/m/${away.image_id}.png` }}
                        />}
                        <Text style={styles.eventItemTeamName}>{away.name}</Text>
                        <Text style={styles.eventItemTeamScore}>{score_away}</Text>
                    </View>
                </View>
                <View style={styles.eventItemStatus}>
                    <Text style={styles.eventItemStatusText}>{time_str}</Text>
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
        flex: 1,
        justifyContent: 'center'
    },
    eventItemStatusText: {
        fontSize: 16,
        color: 'white',
        marginVertical: 8,
        textAlign: 'right'
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
