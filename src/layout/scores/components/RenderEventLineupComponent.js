import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { LoadingIndicator } from './LoadingIndicator';
import { Text } from '@ui-kitten/components';
import { truncateString } from '../../../libs/functions';
import TeamLogoImage from '../../../components/team-logo-image';

const RenderEventLineupComponent = ({ event, loading }) => {
    const renderLineupTeam = (team, lineup, isAway = false) => {
        const { formation, startinglineup, substitutes } = lineup;
        return (
            <View style={[styles.lineupTeamContainer, isAway ? styles.lineupAwayContainer : null]}>
                <View style={[styles.teamHeaderContainer, isAway ? styles.teamAwayHeader : null]}>
                    <TeamLogoImage image_id={team.image_id} size={24} style={null} />
                    <Text style={styles.teamNames}>{truncateString(team.name)}</Text>
                </View>
                {formation && <View style={styles.formationContainer}>
                    <Text style={styles.formationTitle}>Formation</Text>
                    <Text style={styles.formationValue}>{formation}</Text>
                </View>}
                {startinglineup && startinglineup.length && <View style={styles.startingLineupContainer}>
                    <Text style={styles.startingLineupTitle}>Starting Lineup</Text>
                    {startinglineup.map((lineup, index) => (
                        <View key={index} style={styles.lineupRowContainer}>
                            <Text style={[styles.shirtnumber, isAway ? styles.awayShirtNumber : null]}>{lineup.shirtnumber}</Text>
                            <Text style={styles.playerName} numberOfLines={1}>{lineup.player.name}</Text>
                            {lineup.pos && <Text style={styles.position}>{lineup.pos[0]}</Text>}
                        </View>
                    ))}
                </View>}
                {substitutes && substitutes.length && <View style={styles.startingLineupContainer}>
                    <Text style={styles.startingLineupTitle}>Substitutes</Text>
                    {substitutes.map((lineup, index) => (
                        <View key={index} style={styles.lineupRowContainer}>
                            <Text style={[styles.shirtnumber, isAway ? styles.awayShirtNumber : null]}>{lineup.shirtnumber}</Text>
                            <Text style={styles.playerName} numberOfLines={1}>{lineup.player.name}</Text>
                            {lineup.pos && <Text style={styles.position}>{lineup.pos[0]}</Text>}
                        </View>
                    ))}
                </View>}
            </View>
        )
    }

    const renderContent = () => {
        if (loading) {
            return (
                <LoadingIndicator style={styles.loadingIndicator} />
            );
        }
        if (!event || !event.lineup || !event.lineup.home || !event.lineup.away) {
            return (
                <Text style={styles.noDataText}>No Data Availale.</Text>
            );
        }
        const { home, away, lineup } = event;
        return (
            <View style={styles.lineupContainer}>
                {renderLineupTeam(home, lineup.home)}
                {renderLineupTeam(away, lineup.away, true)}
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            {renderContent()}
        </ScrollView>
    )
}

export default RenderEventLineupComponent;

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
    lineupContainer: {
        flexDirection: 'row',
        paddingTop: 16
    },
    lineupAwayContainer: {
        borderLeftColor: '#666',
        borderLeftWidth: 2
    },
    lineupTeamContainer: {
        width: '50%',
        paddingHorizontal: 5,
        paddingBottom: 5
    },
    teamHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    teamAwayHeader: {
        flexDirection: 'row-reverse',
    },
    teamNames: {
        fontSize: 14,
        marginHorizontal: 10
    },
    formationContainer: {
        flexDirection: 'row',
        marginTop: 10,
        borderColor: '#222',
        borderBottomWidth: 1,
        paddingHorizontal: 5,
    },
    formationTitle: {
        color: 'white',
        fontSize: 12
    },
    formationValue: {
        color: '#999',
        fontSize: 13,
        marginLeft: 'auto'
    },
    startingLineupTitle: {
        color: '#aaa',
        fontSize: 12,
        marginBottom: 5
    },
    startingLineupContainer: {
        paddingHorizontal: 5,
        marginTop: 10,
        borderColor: '#222',
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    lineupRowContainer: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center'
    },
    shirtnumber: {
        fontSize: 12,
        backgroundColor: 'gold',
        width: 18,
        height: 18,
        textAlign: 'center',
        borderRadius: 9,
        alignContent: 'center',
        alignItems: 'center',
        color: 'black'
    },
    awayShirtNumber: {
        backgroundColor: '#00D',
        color: 'white'
    },
    playerName: {
        fontSize: 12,
        marginLeft: 4
    },
    position: {
        fontSize: 13,
        marginLeft: 'auto',
        color: '#999'
    }
});
