import React, { Component } from 'react';
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import { Text } from '@ui-kitten/components';
import LeaguesListComponent from './components/LeaguesListComponent';
import { LoadingIndicator } from './components/LoadingIndicator';
import RenderFavoriteComponent from './components/RenderFavoriteComponent';
import { getEvent } from '../../redux/services';

export default class ScoresPerDayScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            refreshing: false,
            data: null,
            favorites: null,
            scorecards: null,
            inplayTimeout: null,
        }
        this._Mounted = false;
    }

    componentDidMount() {
        const { navigation } = this.props;
        this._Mounted = true;
        this.getEventsData(true);
        this.willFocusSubscription = navigation.addListener('focus', () => this.getEventsData(false, true));
    }

    componentWillUnmount() {
        this._Mounted = false;
        if (this.willFocusSubscription) {
            this.willFocusSubscription();
        }
        this.clearInplayTimeout()
    }

    clearInplayTimeout = () => {
        const { inplayTimeout } = this.state;
        if (inplayTimeout) {
            clearTimeout(inplayTimeout);
        }
    }

    getEventsData = (loading = true, refreshing = false) => {
        const { date, sport, league } = this.props;
        const { refreshing: refreshingState, loading: loadingState } = this.state;

        if (refreshingState || loadingState) return;

        this._Mounted && this.setState({
            loading: loading,
            refreshing: refreshing
        });
        getEvent(date, sport, league)
            .then(({ data: result }) => {
                const { data, favorites, scorecards } = result;
                let hasInplay = false;
                if (data) {
                    for (const league of data) {
                        for (const event of league.events) {
                            if (event.time_status == "1") {
                                hasInplay = true;
                                break;
                            }
                        }
                        if (hasInplay) {
                            break;
                        }
                    }
                }
                if (!hasInplay && scorecards) {
                    for (const event of scorecards) {
                        if (event.time_status == "1") {
                            hasInplay = true;
                            break;
                        }
                    }
                }
                this.clearInplayTimeout();
                if (hasInplay) {
                    const inplayTimeout = setTimeout(() => this.getEventsData(false, false), 5 * 1000);
                    this.setState({ inplayTimeout })
                }
                this._Mounted && this.setState({
                    loading: false,
                    refreshing: false,
                    data: data,
                    favorites: favorites && favorites.length ? favorites : null,
                    scorecards: scorecards && scorecards.length ? scorecards : null,
                });
            })
            .catch(() => {
                this.clearInplayTimeout();
                this._Mounted && this.setState({
                    loading: false,
                    refreshing: false,
                    data: null,
                    favorites: null,
                    scorecards: null
                });
            })
    }

    renderFavorite = () => {
        const { navigation } = this.props;
        const { favorites, scorecards } = this.state;
        if (favorites || scorecards) {
            return (
                <RenderFavoriteComponent favorites={favorites}
                    scorecards={scorecards}
                    navigation={navigation} />
            )
        }
        return null;
    }

    renderLeagues = ({ item }) => {
        const { navigation } = this.props;
        return (
            <LeaguesListComponent
                league={item}
                seeRounds={() => navigation.navigate('RoundLeague', { league: { name: item.name, id: item.league_id } })}
                navigation={navigation} />
        )
    }

    renderEmptyList = () => {
        const { loading } = this.state;
        return loading ? null : (
            <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 16, marginTop: 20 }}>There are no events.</Text>
            </View>
        )
    }

    onRefresh = () => {
        this.getEventsData(false, true);
    }

    render() {
        const { data, loading, refreshing } = this.state;

        return (
            <View style={styles.container}>
                {loading && <LoadingIndicator style={styles.loadingIndicator} />}
                {!loading && <FlatList
                    onScroll={this._handleScroll}
                    onScrollAnimationEnd={this._handleScroll}
                    style={styles.list}
                    data={data ? data : []}
                    renderItem={this.renderLeagues}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.renderFavorite}
                    ListEmptyComponent={this.renderEmptyList}
                    refreshControl={<RefreshControl
                        colors={['#000']}
                        progressBackgroundColor="#FFF"
                        refreshing={refreshing}
                        onRefresh={this.onRefresh} />}
                />}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: 10,
    },
    loadingIndicator: {
        flex: 1
    },
    list: {
        backgroundColor: '#121212',
        paddingBottom: 20,
        flex: 1,
    },
});
