import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import { Button, Text, List } from '@ui-kitten/components';
import { PlusOutlineIcon, RefreshIcon } from '../../components/icons';
import LeaguesListComponent from './components/LeaguesListComponent';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ApiService } from '../../services/api.service';
import RenderFavoriteComponent from './components/RenderFavoriteComponent';

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
        ApiService.get('events/league', { params: { date, league: league.id } })
            .then(({ data }) => {
                const { favorites, data: leagueData } = data;
                this.setState({
                    loading: false,
                    favorites: null,
                    data: leagueData
                });
            })
            .catch(() => {
                console.log(error);
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

    renderFavorite = (favorites) => (
        favorites ? <RenderFavoriteComponent favorites={favorites} /> : null
    )

    render() {
        const { loading, data, favorites } = this.state;

        return (
            <View style={styles.container} >
                {loading && <LoadingIndicator style={styles.loadingIndicator} />}
                {!loading && <List
                    style={styles.list}
                    data={data ? data : []}
                    renderItem={this.renderLeagues}
                    ListHeaderComponent={() => this.renderFavorite(favorites)}
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
        width: 40,
        height: 40,
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
        width: 30,
        height: 30,
        tintColor: '#FFFFFF'
    },
});
