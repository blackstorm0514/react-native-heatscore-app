import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Text } from '@ui-kitten/components';
import { RefreshIcon } from '../../libs/icons';
import LeaguesListComponent from './components/LeaguesListComponent';
import { LoadingIndicator } from './components/LoadingIndicator';
import RenderFavoriteComponent from './components/RenderFavoriteComponent';
import { getLeagueEvents } from '../../redux/services';

const inPlayTime = 30 * 1000;

class ScoresLeagueScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            favorites: null,
            data: null,
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

    getSnapshotBeforeUpdate(prevProps) {
        return { reloadRequired: prevProps.league.id !== this.props.league.id };
    }

    componentDidUpdate(prevProps, prevState, snapshots) {
        if (snapshots.reloadRequired) {
            this.getEventsData();
        }
    }

    getEventsData = (setLoading = true) => {
        const { date, league } = this.props;
        const { inplayTimeout } = this.state;
        if (inplayTimeout) clearTimeout(inplayTimeout);
        this._Mounted && this.setState({ loading: setLoading, inplayTimeout: null });
        getLeagueEvents(date, league.id)
            .then(({ data }) => {
                const { favorites, data: leagueData } = data;
                let hasInplay = false;

                if (leagueData && leagueData.length) {
                    for (const event of leagueData) {
                        if (event.time_status == '1') {
                            hasInplay = true;
                            break;
                        }
                    }
                }

                this._Mounted && this.setState({
                    loading: false,
                    favorites: favorites && favorites.length ? favorites : null,
                    data: leagueData,
                    inplayTimeout: hasInplay ? setTimeout(() => this.getEventsData(false), inPlayTime) : null
                });
            })
            .catch(() => {
                this._Mounted && this.setState({
                    loading: false,
                    favorites: null,
                    data: []
                });
            })
    }

    renderLeagues = ({ item }) => {
        const { navigation } = this.props;
        return (
            <LeaguesListComponent
                league={item}
                navigation={navigation}
                seeRounds={() => navigation.navigate('RoundLeague', { league: { name: item.name, id: item.league_id } })}
            />
        )
    }

    onFloatinActionClick = () => {
        this.getEventsData();
    };

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

    renderEmptyList = () => (
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 16, marginTop: 20 }}>There are no events.</Text>
        </View>
    )

    render() {
        const { loading, data } = this.state;

        return (
            <View style={styles.container} >
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
                    <RefreshIcon style={styles.floatingActionButtonIconStyle} />
                </TouchableOpacity>
            </View >
        )
    }
};

export default ScoresLeagueScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    list: {
        backgroundColor: 'black',
        paddingBottom: 20
    },
    loadingIndicator: {
        flex: 1
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
