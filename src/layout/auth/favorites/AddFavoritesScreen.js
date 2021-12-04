import React, { PureComponent } from 'react';
import { Layout, List, Text, TopNavigation, Input, Button } from '@ui-kitten/components';
import { StyleSheet, View, Dimensions, BackHandler } from 'react-native'
import FavoriteItemComponent from './components/FavoriteItemComponent';
import { CloseIcon, SearchIcon } from '../../../libs/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingIndicator } from '../../scores/components/LoadingIndicator';
import { addFavorite, searchTeams } from '../../../redux/services';
import { connect } from 'react-redux';
import { actions } from '../../../redux/reducer';
import Toast from 'react-native-simple-toast';

const screenWidth = Dimensions.get('window').width;

class AddFavoritesScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            items: [],
            loading: false,
        }
        this._Mounted = false;
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => { navigation.navigate('Favorites'); return true; }
        );
        this._Mounted = true;
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this._Mounted = false;
    }

    onAddFavorite = (sport, team, favorite) => {
        const { addFavoritesAction } = this.props;
        if (favorite) {
            return;
        }
        addFavorite(sport, team)
            .then(({ data }) => {
                const { success, error } = data;
                if (success) {
                    addFavoritesAction({ sport, team });
                    Toast.show(`${team.name} successfully added to your favorites.`);
                } else {
                    Toast.show(error);
                }
            })
            .catch(error => {
                Toast.show('Cannot add your favorite, Please try again later.');
            });
    };

    renderTeamItem = ({ item, sport }) => {
        return (
            <FavoriteItemComponent
                style={styles.item}
                team={item}
                sport={sport}
                onPress={this.onAddFavorite}
            />
        )
    };

    renderSportItem = ({ item }) => (
        <List
            data={item.teams}
            renderItem={(props) => this.renderTeamItem({ ...props, sport: item._id })}
            ListHeaderComponent={() => this.renderSportHeader(item._id)}
        />
    )

    renderSportHeader = (sport) => (
        <View style={styles.sportsTitle}>
            <Text style={styles.sportsTitleText} numberOfLines={1}>{sport}</Text>
        </View>
    )

    customSearchIcon = () => {
        return <SearchIcon style={styles.searchIcon} />
    }

    customClearIcon = () => {
        const { search } = this.state;
        return search ? <TouchableOpacity activeOpacity={0.8} onPress={() => this._Mounted && this.setState({ search: '' })}>
            <CloseIcon style={styles.searchIcon} />
        </TouchableOpacity> : null
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
                />
                <Button style={styles.searchButton}
                    onPress={this.searchTeams}
                    size='medium'>Search</Button>
            </View>
        );
    }

    searchTeams = () => {
        const { search, loading } = this.state;
        if (loading) return;
        if (search) {
            this._Mounted && this.setState({ loading: true, items: [] });
            searchTeams(search)
                .then(({ data }) => {
                    this._Mounted && this.setState({ loading: false, items: data });
                })
                .catch(error => {
                    this._Mounted && this.setState({ loading: false, items: [] });
                })
        } else {
            this._Mounted && this.setState({ items: [] });
        }
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

    render() {
        const { items } = this.state;

        return (
            <View style={styles.container}>
                <List
                    style={styles.list}
                    data={items}
                    renderItem={this.renderSportItem}
                    ListHeaderComponent={this.renderHeader}
                    ListEmptyComponent={this.renderEmpty}
                />
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    favorites: state.favorites,
});


export default connect(mapStateToProps, { addFavoritesAction: actions.addFavoritesAction })(AddFavoritesScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    titleText: {
        fontWeight: 'bold'
    },
    list: {
        flex: 1,
        backgroundColor: '#000'
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 2,
        backgroundColor: '#111',
        flexDirection: 'row'
    },
    item: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#222',
        backgroundColor: '#000'
    },
    loadingIndicator: {
        flex: 1,
        marginTop: 30
    },
    searchInput: {
        marginTop: 6,
        backgroundColor: '#000',
        borderWidth: 0,
        borderRadius: 6,
        flex: 1,
        tintColor: '#FFF'
    },
    searchButton: {
        backgroundColor: '#111',
        borderColor: '#111',
        color: 'white',
    },
    searchIcon: {
        height: 20,
        width: 20,
        marginHorizontal: 4,
        tintColor: '#FFF'
    },
    noResultText: {
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 14
    },
    sportsTitle: {
        backgroundColor: '#222',
        paddingVertical: 2,
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderBottomColor: '#888',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: screenWidth
    },
    sportsTitleText: {
        color: 'white',
        fontWeight: 'bold',
        paddingVertical: 2,
        maxWidth: '100%',
        fontSize: 14,
    },
});
