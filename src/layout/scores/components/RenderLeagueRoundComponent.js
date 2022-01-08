import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Dimensions, } from 'react-native';
import { Text, List } from '@ui-kitten/components';
import { LoadingIndicator } from './LoadingIndicator';
import TeamLogoImage from '../../../components/team-logo-image';

const screenWidth = Dimensions.get('window').width;
const RenderLeagueRoundComponent = ({ loading, rounds }) => {
    const renderRoundsTable = () => {
        const { tables } = rounds;

        return (
            <ScrollView horizontal
                style={styles.scrollViewContainer}>
                <List
                    style={styles.list}
                    data={tables ? tables : []}
                    renderItem={renderTables}
                    ListHeaderComponent={renderTitle}
                />
            </ScrollView>
        )
    }

    const renderTitle = () => {
        const { name } = rounds;
        return (
            <View style={styles.leagueTitle}>
                <Text style={styles.leagueTitleText}>{name}</Text>
            </View>
        )
    }

    const renderTables = ({ item }) => {
        return (
            <List
                data={['title', ...item.rows]}
                renderItem={renderTableRow}
                ListHeaderComponent={() => renderTableTitle(item)}
            />
        );
    }

    const renderTableTitle = (item) => {
        const { name, maxrounds } = item;
        return (
            <View style={styles.tableTitle}>
                <Text style={styles.tableTitleText}>{name}</Text>
            </View>
        );
    }

    const renderTableRow = ({ item }) => {
        if (item == 'title') {
            return (
                <View style={[styles.tableRow, styles.tableRowHeader]}>
                    <Text style={[styles.tableRowTeam, styles.tableRowHeaderItem]}>Team</Text>
                    <Text style={[styles.tableRowPLD, styles.tableRowHeaderItem]}>PLD</Text>
                    <Text style={[styles.tableRowPLD, styles.tableRowHeaderItem]}>W</Text>
                    <Text style={[styles.tableRowPLD, styles.tableRowHeaderItem]}>D</Text>
                    <Text style={[styles.tableRowPLD, styles.tableRowHeaderItem]}>L</Text>
                    <Text style={[styles.tableRowPLD, styles.tableRowHeaderItem]}>GF</Text>
                    <Text style={[styles.tableRowPLD, styles.tableRowHeaderItem]}>GA</Text>
                    <Text style={[styles.tableRowPLD, styles.tableRowHeaderItem]}>+/-</Text>
                    <Text style={[styles.tableRowPLD, styles.tableRowHeaderItem]}>Pts</Text>
                </View>
            )
        }

        return (
            <View style={styles.tableRow}>
                <View style={styles.tableRowTeam}>
                    <TeamLogoImage image_id={item.team.image_id} size={20} style={null} />
                    <Text style={styles.tableRowTeamName} numberOfLines={1}>
                        {item.team.name}
                    </Text>
                </View>
                <Text style={styles.tableRowPLD}>{item.win + item.draw + item.loss}</Text>
                <Text style={styles.tableRowPLD}>{item.win}</Text>
                <Text style={styles.tableRowPLD}>{item.draw}</Text>
                <Text style={styles.tableRowPLD}>{item.loss}</Text>
                <Text style={styles.tableRowPLD}>{item.goalsfor}</Text>
                <Text style={styles.tableRowPLD}>{item.goalsagainst}</Text>
                <Text style={styles.tableRowPLD}>{item.goalDiffTotal}</Text>
                <Text style={styles.tableRowPLD}>{item.points}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading && <LoadingIndicator style={styles.loadingIndicator} />}
            {!rounds && !loading && <Text style={styles.noDataText}>No Data Available.</Text>}
            {rounds && renderRoundsTable()}
        </SafeAreaView >
    )
};

export default RenderLeagueRoundComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    list: {
        backgroundColor: '#121212',
        paddingBottom: 20,
        flex: 1,
        minWidth: screenWidth,
        display: "flex",
        height: "100%",
    },
    loadingIndicator: {
        flex: 1
    },
    noDataText: {
        color: 'white',
        marginTop: 30,
        fontSize: 24,
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
        fontSize: 14
    },
    tableTitle: {
        backgroundColor: '#222',
        paddingVertical: 3,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#888',
        borderBottomWidth: 1
    },
    tableTitleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13
    },
    tableRow: {
        backgroundColor: '#121212',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#333'
    },
    tableRowTeam: {
        width: 200,
        flexDirection: 'row'
    },
    tableRowPLD: {
        width: 40,
        textAlign: 'center',
        fontSize: 13
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
        fontSize: 13,
    }
});
