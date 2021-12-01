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
class RenderLeagueTopScorerComponent extends Component {
    renderGoalsTable = () => {
        const { topgoals } = this.props;

        return (
            <ScrollView horizontal
                style={styles.scrollViewContainer}>
                <List
                    style={styles.list}
                    data={topgoals ? ['title', ...topgoals.slice(0, 20)] : []}
                    renderItem={this.renderGoalsTableRow}
                    ListHeaderComponent={() => this.renderTitle('Top Scorers')}
                />
            </ScrollView>
        )
    }

    renderGoalsTableRow = ({ item }) => {
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
                    <Image
                        style={styles.teamLogoImage}
                        source={{ uri: `https://assets.b365api.com/images/team/m/${item.team.image_id}.png` }}
                    />
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

    renderTitle = (title) => {
        return (
            <View style={styles.leagueTitle}>
                <Text style={styles.leagueTitleText}>{title}</Text>
            </View>
        )
    }

    renderAssistsTable = () => {
        const { topassists } = this.props;

        return (
            <ScrollView horizontal
                style={styles.scrollViewContainer}>
                <List
                    style={styles.list}
                    data={topassists ? ['title', ...topassists.slice(0, 20)] : []}
                    renderItem={this.renderAssistsTableRow}
                    ListHeaderComponent={() => this.renderTitle('Top Assists')}
                />
            </ScrollView>
        )
    }

    renderAssistsTableRow = ({ item }) => {
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
                    <Image
                        style={styles.teamLogoImage}
                        source={{ uri: `https://assets.b365api.com/images/team/m/${item.team.image_id}.png` }}
                    />
                    <Text style={styles.tableRowTeamName} numberOfLines={1}>
                        {item.player}
                    </Text>
                </View>
                <Text style={styles.tableRowItem}>{item.assists}</Text>
                <Text style={styles.tableRowItem}>{item.matches}</Text>
            </View>
        );
    }

    render() {
        const { loading, topgoals, topassists } = this.props;

        return (
            <SafeAreaView style={styles.container} >
                {loading && <LoadingIndicator style={styles.loadingIndicator} />}
                {!topgoals && !topassists && !loading && <Text style={styles.noDataText}>No Data Available.</Text>}
                {topgoals && this.renderGoalsTable()}
                {topassists && this.renderAssistsTable()}
            </SafeAreaView>
        )
    }
};

export default RenderLeagueTopScorerComponent;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // overflow: 'scroll',
        minHeight: '100%',
        backgroundColor: 'black'
    },
    list: {
        backgroundColor: 'black',
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
        fontSize: 14,
    },
    tableRow: {
        backgroundColor: '#000',
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
    teamLogoImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
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
