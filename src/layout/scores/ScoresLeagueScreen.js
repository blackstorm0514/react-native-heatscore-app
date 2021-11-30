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

class ScoresLeagueScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            favorites: null,
            data: null,
        }
    }

    componentDidMount() {
        this.getEventsData();
    }

    getEventsData = () => {
        const { date, league } = this.props;
        this.setState({ loading: true });
        getLeagueEvents(date, league.id)
            .then(({ data }) => {
                const { favorites, data: leagueData } = data;
                this.setState({
                    loading: false,
                    favorites: favorites && favorites.length ? favorites : null,
                    data: leagueData
                });
            })
            .catch(() => {
                // console.log(error);
                this.setState({
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
