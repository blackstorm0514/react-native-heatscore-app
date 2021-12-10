import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    SafeAreaView,
    Dimensions,
    Image
} from 'react-native';
import { Button, Text, List } from '@ui-kitten/components';
import { LoadingIndicator } from './LoadingIndicator';

const screenWidth = Dimensions.get('window').width;
class RenderLeagueRoundComponent extends Component {
    renderRoundsTable = () => {
        const { rounds } = this.props;
        const { tables } = rounds;

        return (
            <ScrollView horizontal
                style={styles.scrollViewContainer}>
                <List
                    style={styles.list}
                    data={tables ? tables : []}
                    renderItem={this.renderTables}
                    ListHeaderComponent={this.renderTitle}
                />
            </ScrollView>
        )
    }

    renderTitle = () => {
        const { rounds } = this.props;
        const { name } = rounds;
        return (
            <View style={styles.leagueTitle}>
                <Text style={styles.leagueTitleText}>{name}</Text>
            </View>
        )
    }

    renderTables = ({ item }) => {
        return (
            <List
                data={['title', ...item.rows]}
                renderItem={this.renderTableRow}
                ListHeaderComponent={() => this.renderTableTitle(item)}
            />
        );
    }

    renderTableTitle = (item) => {
        const { name, maxrounds } = item;
        return (
            <View style={styles.tableTitle}>
                <Text style={styles.tableTitleText}>{name}</Text>
            </View>
        );
    }

    renderTableRow = ({ item }) => {
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
                    <Image
                        style={styles.teamLogoImage}
                        source={{ uri: `https://assets.b365api.com/images/team/m/${item.team.image_id}.png` }}
                    />
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

    render() {
        const { loading, rounds } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                {loading && <LoadingIndicator style={styles.loadingIndicator} />}
                {!rounds && !loading && <Text style={styles.noDataText}>No Data Available.</Text>}
                {rounds && this.renderRoundsTable()}
            </SafeAreaView >
        )
    }
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
    teamLogoImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
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
