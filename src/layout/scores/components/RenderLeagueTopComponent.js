import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Text, List } from '@ui-kitten/components';
import { LoadingIndicator } from './LoadingIndicator';
import TeamLogoImage from '../../../components/team-logo-image';

const screenWidth = Dimensions.get('window').width;
const RenderLeagueTopScorerComponent = ({ loading, topgoals, topassists }) => {
    const renderGoalsTable = () => {

        return (
            <ScrollView horizontal
                style={styles.scrollViewContainer}>
                <List
                    style={styles.list}
                    data={topgoals ? ['title', ...topgoals.slice(0, 20)] : []}
                    renderItem={renderGoalsTableRow}
                    ListHeaderComponent={() => renderTitle('Top Scorers')}
                />
            </ScrollView>
        )
    }

    const renderGoalsTableRow = ({ item }) => {
        if (item == 'title') {
            return (
                <View style={[styles.tableRow, styles.tableRowHeader]}>
                    <Text style={[styles.tableRowPlayer, styles.tableRowHeaderItem]}>Player</Text>
                    <Text style={[styles.tableRowItem, styles.tableRowHeaderItem]}>G</Text>
                    <Text style={[styles.tableRowItem, styles.tableRowHeaderItem]}>P</Text>
                    <Text style={[styles.tableRowItem, styles.tableRowHeaderItem]}>M</Text>
                </View>
            )
        }
        return (
            <View style={styles.tableRow}>
                <View style={styles.tableRowPlayer}>
                    <TeamLogoImage image_id={item.team.image_id} size={20} style={null} />
                    <Text style={styles.tableRowTeamName} numberOfLines={1}>
                        {item.player}
                    </Text>
                </View>
                <Text style={styles.tableRowItem}>{item.goals}</Text>
                <Text style={styles.tableRowItem}>{item.penalties}</Text>
                <Text style={styles.tableRowItem}>{item.matches}</Text>
            </View>
        );
    }

    const renderTitle = (title) => {
        return (
            <View style={styles.leagueTitle}>
                <Text style={styles.leagueTitleText}>{title}</Text>
            </View>
        )
    }

    const renderAssistsTable = () => {

        return (
            <ScrollView horizontal
                style={styles.scrollViewContainer}>
                <List
                    style={styles.list}
                    data={topassists ? ['title', ...topassists.slice(0, 20)] : []}
                    renderItem={renderAssistsTableRow}
                    ListHeaderComponent={() => renderTitle('Top Assists')}
                />
            </ScrollView>
        )
    }

    const renderAssistsTableRow = ({ item }) => {
        if (item == 'title') {
            return (
                <View style={[styles.tableRow, styles.tableRowHeader]}>
                    <Text style={[styles.tableRowPlayer, styles.tableRowHeaderItem]}>Player</Text>
                    <Text style={[styles.tableRowItem, styles.tableRowHeaderItem]}>A</Text>
                    <Text style={[styles.tableRowItem, styles.tableRowHeaderItem]}>M</Text>
                </View>
            )
        }
        return (
            <View style={styles.tableRow}>
                <View style={styles.tableRowPlayer}>
                    <TeamLogoImage image_id={item.team.image_id} size={20} style={null} />
                    <Text style={styles.tableRowTeamName} numberOfLines={1}>
                        {item.player}
                    </Text>
                </View>
                <Text style={styles.tableRowItem}>{item.assists}</Text>
                <Text style={styles.tableRowItem}>{item.matches}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} >
            {loading && <LoadingIndicator style={styles.loadingIndicator} />}
            {!topgoals && !topassists && !loading && <Text style={styles.noDataText}>No Data Available.</Text>}
            {topgoals && renderGoalsTable()}
            {topassists && renderAssistsTable()}
        </SafeAreaView>
    )
};

export default RenderLeagueTopScorerComponent;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // overflow: 'scroll',
        minHeight: '100%',
        backgroundColor: '#121212'
    },
    list: {
        backgroundColor: '#121212',
        paddingBottom: 20,
        minWidth: screenWidth,
        // display: "flex",
        // height: "100%",
    },
    loadingIndicator: {
        flex: 1
    },
    noDataText: {
        color: 'white',
        marginTop: 30,
        fontSize: 20,
        alignSelf: 'center'
    },
    scrollViewContainer: {
        width: screenWidth,
        display: "flex"
    },
    leagueTitle: {
        backgroundColor: '#333',
        paddingVertical: 2,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#888',
        borderBottomWidth: 2
    },
    leagueTitleText: {
        color: 'white',
        fontWeight: 'bold',
        paddingVertical: 4,
        fontSize: 14,
    },
    tableRow: {
        backgroundColor: '#121212',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#333'
    },
    tableRowPlayer: {
        width: 200,
        flexDirection: 'row'
    },
    tableRowItem: {
        width: 40,
        textAlign: 'center',
        fontSize: 13,
    },
    tableRowHeader: {
        borderBottomColor: '#ddd'
    },
    tableRowHeaderItem: {
        fontWeight: 'bold',
        fontSize: 13
    },
    tableRowTeamName: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 13
    }
});
