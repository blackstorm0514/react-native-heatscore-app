import React, { PureComponent } from 'react';
import { Text, TopNavigationAction, TopNavigation } from '@ui-kitten/components';
import { StyleSheet, View, BackHandler, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import { ArrowIosBackIcon } from '../../libs/icons';
import { LoadingIndicator } from './components/LoadingIndicator';
import { addFavorite, removeFavorite, searchEventsForTeam } from '../../redux/services';
import TeamLogoImage from '../../components/team-logo-image';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import RenderEventComponentOnTeam from './components/RenderEventComponentOnTeam';

class SearchEventForTeamScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loading: false,
            refreshing: false,
        }
        this._Mounted = false;
    }

    componentDidMount() {
        const { navigation, route: { params: { team } } } = this.props;
        if (!team) {
            return navigation.goBack();
        }
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => { navigation.goBack(); return true; }
        );
        this._Mounted = true;
        this.searchEvents(false);
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this._Mounted = false;
    }

    searchEvents = (isRefresh = false) => {
        const { loading, refreshing } = this.state;
        const { route: { params: { team } } } = this.props;
        if (loading || refreshing) return;
        this._Mounted && this.setState({ [isRefresh ? 'refreshing' : 'loading']: true });
        searchEventsForTeam(team.id)
            .then(({ data }) => {
                const { success, result } = data;
                if (success) {
                    this._Mounted && this.setState({ [isRefresh ? 'refreshing' : 'loading']: false, items: result });
                } else {
                    this._Mounted && this.setState({ [isRefresh ? 'refreshing' : 'loading']: false, items: [] });
                }
            })
            .catch((error) => {
                this._Mounted && this.setState({ [isRefresh ? 'refreshing' : 'loading']: false, items: [] });
            })
    }

    renderHeader = () => {
        const { route: { params: { team } } } = this.props;
        return (
            <Text style={styles.headerText}>{team.name}</Text>
        );
    }

    goBackAction = () => {
        const { navigation } = this.props;
        return (
            <TopNavigationAction
                icon={ArrowIosBackIcon}
                onPress={() => navigation.goBack()}
            />
        )
    }

    renderTeamLogo = () => {
        const { navigation, route: { params: { team } } } = this.props;
        return team && (
            <TopNavigationAction
                icon={() => <TeamLogoImage image_id={team.image_id} size={20} style={null} />}
                onPress={() => navigation.goBack()}
            />
        )
    }

    renderEmpty = () => {
        const { loading } = this.state;
        return (
            loading ? <LoadingIndicator style={styles.loadingIndicator} /> :
                <View style={styles.item}>
                    <Text style={styles.noResultText}>No Upcoming Events for this team.</Text>
                </View>
        )
    }

    toggleFavorite = (team) => {
        const { user } = this.props;
        if (!user) {
            return Toast.show('Please log in to add favorite.');
        }
        const { items } = this.state;
        const favFunction = team.favorite ? removeFavorite : addFavorite;
        this.setState({ refreshing: true });
        favFunction(team.sport.name, { id: team.id, name: team.name, image_id: team.image_id })
            .then(({ data }) => {
                const { success, error } = data;
                if (success) {
                    this.setState({
                        items: items.map(item => {
                            if (item.id == team.id) {
                                return {
                                    ...team,
                                    favorite: !team.favorite
                                }
                            }
                            return item;
                        }),
                        refreshing: false
                    })
                } else {
                    Toast.show(error);
                    this.setState({ refreshing: false });
                }
            })
            .catch((error) => {
                Toast.show('Cannot add/remove favorite. Please try again later.');
                this.setState({ refreshing: false });
            })
    }

    renderItem = ({ item }) => {
        const { navigation } = this.props;
        return (
            <RenderEventComponentOnTeam
                navigation={navigation}
                event={item}
            />
        );
    }

    render() {
        const { items, refreshing } = this.state;

        return (
            <View style={styles.container}>
                <TopNavigation
                    accessoryLeft={this.goBackAction}
                    accessoryRight={this.renderTeamLogo}
                    title={this.renderHeader}
                    style={styles.headerStyle}
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, key) => key.toString()}
                    data={items}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.renderEmpty}
                    refreshing={refreshing}
                    refreshControl={<RefreshControl
                        colors={['#000']}
                        progressBackgroundColor="#FFF"
                        refreshing={refreshing}
                        onRefresh={() => this.searchEvents(true)}
                    />} />
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(SearchEventForTeamScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    titleText: {
        fontWeight: 'bold'
    },
    headerStyle: {
        backgroundColor: '#121212'
    },
    headerText: {
        fontSize: 14
    },
    item: {
        paddingVertical: 16,
    },
    loadingIndicator: {
        flex: 1,
        marginTop: 30
    },
    noResultText: {
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 14
    },
    itemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    teamLogoImage: {
        marginRight: 10,
    },
    teamName: {
        maxWidth: '70%',
        fontSize: 18,
        marginRight: 'auto'
    },
    toggleFavorite: {
        marginLeft: 'auto',
    },
});
