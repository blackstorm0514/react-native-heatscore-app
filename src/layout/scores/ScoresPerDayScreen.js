import React, { Component } from 'react';
import { FlatList, StyleSheet, View, } from 'react-native';
import { Text } from '@ui-kitten/components';
import { RefreshIcon } from '../../libs/icons';
import LeaguesListComponent from './components/LeaguesListComponent';
import { TouchableOpacity } from 'react-native';
import { LoadingIndicator } from './components/LoadingIndicator';
import RenderFavoriteComponent from './components/RenderFavoriteComponent';
import { getEvent } from '../../redux/services';

const inPlayTime = 30 * 1000;

export default class ScoresPerDayScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: null,
            favorites: null,
            inplayTimeout: null,
        }
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
        this.getEventsData();
    }

    componentWillUnmount() {
        const { inplayTimeout } = this.state;
        if (inplayTimeout) clearTimeout(inplayTimeout);
        this._Mounted = false;
    }

    getEventsData = (setLoading = true) => {
        const { date, sport, league } = this.props;
        const { inplayTimeout } = this.state;
        if (inplayTimeout) clearTimeout(inplayTimeout);
        this._Mounted && this.setState({ loading: setLoading, inplayTimeout: null });
        getEvent(date, sport, league)
            .then(({ data: result }) => {
                const { data, favorites } = result;
                let hasInplay = false;
                if (data && data.length) {
                    for (const league of data) {
                        if (league && league.events && league.events.length) {
                            for (const event of league.events) {
                                if (event.time_status == '1') {
                                    hasInplay = true;
                                    break;
                                }
                            }
                            if (hasInplay) break;
                        }
                    }
                }
                this._Mounted && this.setState({
                    loading: false,
                    data: data,
                    favorites: favorites && favorites.length ? favorites : null,
                    inplayTimeout: hasInplay ? setTimeout(() => this.getEventsData(false), inPlayTime) : null
                });
            })
            .catch(() => {
                this._Mounted && this.setState({ loading: false, data: null, favorites: null });
            })
    }

    renderFavorite = () => {
        const { navigation } = this.props;
        const { favorites } = this.state;
        if (favorites) {
            return (
                <RenderFavoriteComponent favorites={favorites}
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

    onFloatinActionClick = () => {
        this.getEventsData();
    };

    renderEmptyList = () => (
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 16, marginTop: 20 }}>There are no events.</Text>
        </View>
    )

    render() {
        const { data, loading } = this.state;

        return (
            <View style={styles.container}>
                {loading && <LoadingIndicator style={styles.loadingIndicator} />}
                {!loading && <FlatList
                    style={styles.list}
                    data={data ? data : []}
                    renderItem={this.renderLeagues}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.renderFavorite}
                    ListEmptyComponent={this.renderEmptyList}
                />}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.onFloatinActionClick}
                    style={styles.floatingActionButtonStyle}>
                    <RefreshIcon
                        style={styles.floatingActionButtonIconStyle}
                    />
                </TouchableOpacity>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    loadingIndicator: {
        flex: 1
    },
    list: {
        backgroundColor: 'black',
        paddingBottom: 20
    },
    floatingActionButtonStyle: {
        position: 'absolute',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 10,
        backgroundColor: '#666',
        shadowColor: 'white',
        shadowOpacity: 0.6,
        shadowOffset: { width: 5, height: 5 },
        borderRadius: 200 / 2
    },
    floatingActionButtonIconStyle: {
        width: 20,
        height: 20,
        tintColor: '#FFFFFF'
    },
});
