import React, { PureComponent } from 'react';
import { Text, Input, Button } from '@ui-kitten/components';
import { StyleSheet, View, Dimensions, BackHandler, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import { CloseIcon, SearchIcon } from '../../libs/icons';
import { LoadingIndicator } from './components/LoadingIndicator';
import { addFavorite, removeFavorite, searchTeamsForEvents } from '../../redux/services';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TeamLogoImage from '../../components/team-logo-image';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

const screenWidth = Dimensions.get('window').width;

class SearchScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            items: [],
            loading: false,
            refreshing: false,
        }
        this._Mounted = false;
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => { navigation.goBack(); return true; }
        );
        this._Mounted = true;
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this._Mounted = false;
    }

    customSearchIcon = () => {
        return <SearchIcon style={styles.searchIcon} />
    }

    customClearIcon = () => {
        const { search } = this.state;
        return search ? <TouchableOpacity activeOpacity={0.8} onPress={() => this._Mounted && this.setState({ search: '' })}>
            <CloseIcon style={styles.searchIcon} />
        </TouchableOpacity> : null
    }

    searchEvents = (isRefresh = false) => {
        const { search, loading, refreshing } = this.state;
        if (loading || refreshing) return;
        this._Mounted && this.setState({ [isRefresh ? 'refreshing' : 'loading']: true });
        searchTeamsForEvents(search)
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
        const { search } = this.state;
        return (
            <View style={styles.header}>
                <Input
                    style={styles.searchInput}
                    placeholder='Search Team'
                    placeholderTextColor="#888"
                    value={search}
                    onChangeText={(search) => this._Mounted && this.setState({ search })}
                    accessoryLeft={this.customSearchIcon}
                    accessoryRight={this.customClearIcon}
                    size="small"
                />
                <Button style={styles.searchButton}
                    onPress={() => this.searchEvents()}
                    size='medium'>Search</Button>
            </View>
        );
    }

    renderEmpty = () => {
        const { loading } = this.state;
        return (
            loading ? <LoadingIndicator style={styles.loadingIndicator} /> :
                <View style={styles.item}>
                    <Text style={styles.noResultText}>No Result. Please retry with another terms.</Text>
                </View>
        )
    }

    setTeamName = (team) => {
        const { navigation } = this.props;
        navigation.navigate('SearchEventsForTeam', { team });
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
        return (
            <TouchableOpacity style={[styles.item, styles.itemContainer]}
                activeOpacity={0.8}
                onPress={() => this.setTeamName(item)}>
                <TeamLogoImage image_id={item.image_id}
                    size={30}
                    style={styles.teamLogoImage} />
                <Text style={styles.teamName} numberOfLines={1}>{item.name}</Text>
                <TouchableOpacity activeOpacity={0.8}
                    style={styles.toggleFavorite}
                    onPress={() => this.toggleFavorite(item)}>
                    {item.favorite && <MaterialIcons name="star-rate" color='#fdcb04' size={18} />}
                    {!item.favorite && <MaterialIcons name="star-outline" color='#888' size={18} />}
                </TouchableOpacity>
            </TouchableOpacity >
        );
    }

    render() {
        const { items, refreshing } = this.state;

        return (
            <View style={styles.container}>
                {this.renderHeader()}
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

export default connect(mapStateToProps, null)(SearchScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    titleText: {
        fontWeight: 'bold'
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 2,
        backgroundColor: '#121212',
        flexDirection: 'row'
    },
    item: {
        paddingVertical: 16,
    },
    loadingIndicator: {
        flex: 1,
        marginTop: 30
    },
    searchInput: {
        marginTop: 6,
        backgroundColor: '#222',
        borderWidth: 0,
        borderRadius: 6,
        flex: 1,
        tintColor: '#FFF',
        padding: 0,
        fontSize: 14
    },
    searchButton: {
        backgroundColor: '#111',
        borderColor: '#111',
        color: 'white',
    },
    searchIcon: {
        height: 16,
        width: 16,
        marginHorizontal: 4,
        tintColor: '#FFF'
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
