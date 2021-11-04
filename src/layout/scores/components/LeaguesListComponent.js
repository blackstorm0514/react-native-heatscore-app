import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { Button, Text, List } from '@ui-kitten/components';
import { format } from 'date-fns';

export default ({ navigation, league }) => {

    const onItemPress = () => {

    }

    const renderLeagueHeader = () => (
        <View style={styles.leagueTitle}>
            <Text style={styles.leagueTitleText}>{league.name} - {league.sport.name}</Text>
            <Button style={styles.seeAllLeagueButton}
                size='medium'
            >
                SEE ALL
            </Button>
        </View>
    )

    const renderEvent = ({ item }) => {
        const { home, away, time, time_status, ss } = item;
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
                onPress={() => onItemPress()}>
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
                    {/* <Text style={styles.eventItemStatusText}>2nd</Text> */}
                </View>
            </TouchableOpacity>
        )
    }

    if (!league.events || !league.events.length) return null;

    return (
        <List
            style={styles.leagueContainer}
            data={league.events ? league.events.slice(0, 5) : []}
            renderItem={renderEvent}
            ListHeaderComponent={renderLeagueHeader}
        />
    )
}
const styles = StyleSheet.create({
    leagueContainer: {
        paddingBottom: 15,
        backgroundColor: 'black'
    },
    leagueTitle: {
        backgroundColor: '#222',
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#888',
        borderBottomWidth: 2
    },
    leagueTitleText: {
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 10
    },
    seeAllLeagueButton: {
        alignSelf: 'flex-end',
        textTransform: 'uppercase',
        color: 'white',
        backgroundColor: '#222',
        borderColor: '#222',
        borderRadius: 0
    },
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
