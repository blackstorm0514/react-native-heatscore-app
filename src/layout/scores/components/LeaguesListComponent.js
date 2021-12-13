import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Text } from '@ui-kitten/components';
import RenderEventComponent from './RenderEventComponent';
import { connect } from 'react-redux';
import { actions } from '../../../redux/reducer';
import { getSportsIcon } from '../../../libs/functions';

const screenWidth = Dimensions.get('window').width;

class LeaguesListComponent extends PureComponent {
    renderLeagueHeader = () => {
        const { league, seeRounds, toggleCollapseLeagueAction } = this.props;
        const collapsed = this.isCollapsed();

        return (
            <View style={styles.leagueTitle}>
                {getSportsIcon(league.sport.name, '#FFF', 16)}<Text style={styles.leagueTitleText} numberOfLines={1}> {league.name}</Text>
                {seeRounds && <TouchableOpacity activeOpacity={0.8}
                    onPress={() => seeRounds()}
                    style={styles.seeRoundButton}>
                    <Text style={styles.seeRoundText}>SEE ROUNDS</Text>
                </TouchableOpacity>}
                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => toggleCollapseLeagueAction(league.league_id)}
                    style={styles.collapseButtn}>
                    {getSportsIcon(collapsed ? 'show' : 'hide', '#FFF', 16)}
                </TouchableOpacity>
            </View>
        )
    }

    renderEvent = ({ item }) => {
        const { navigation } = this.props;
        return (
            <RenderEventComponent event={item} key={item.event_id}
                navigation={navigation} />
        )
    }

    renderEmptyList = () => {
        const collapsed = this.isCollapsed();
        return !collapsed && (
            <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 16, marginTop: 20 }}>There are no events.</Text>
            </View>
        )
    }

    isCollapsed = () => {
        const { league, collapsedLeagues } = this.props;
        const collapsed = collapsedLeagues.find(collapsed => collapsed == league.league_id);
        return collapsed ? true : false;
    }

    render() {
        const { league } = this.props;
        const collapsed = this.isCollapsed();
        return (
            <FlatList
                style={styles.leagueContainer}
                data={!collapsed && league.events ? league.events : []}
                renderItem={this.renderEvent}
                keyExtractor={(item) => item.event_id.toString()}
                ListHeaderComponent={this.renderLeagueHeader}
                ListEmptyComponent={this.renderEmptyList}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    collapsedLeagues: state.collapsedLeagues,
});

export default connect(mapStateToProps, { toggleCollapseLeagueAction: actions.toggleCollapseLeagueAction })(LeaguesListComponent)

const styles = StyleSheet.create({
    leagueContainer: {
        backgroundColor: '#121212'
    },
    leagueTitle: {
        backgroundColor: '#222',
        paddingVertical: 6,
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderBottomColor: '#888',
        borderBottomWidth: 1,
        width: screenWidth,
        alignItems: 'center'
    },
    leagueTitleText: {
        color: '#FFF',
        fontWeight: '500',
        maxWidth: '70%',
        fontSize: 14,
        marginLeft: 5
    },
    seeRoundButton: {
        marginLeft: 'auto'
    },
    seeRoundText: {
        textTransform: 'uppercase',
        color: '#FFF',
        fontSize: 13,
        fontWeight: '400',
    },
    collapseButtn: {
        marginLeft: 10,
        paddingHorizontal: 5
    }
});
