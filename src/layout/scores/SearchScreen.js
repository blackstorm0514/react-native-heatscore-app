import React, { PureComponent } from 'react';
import { Text, Input, Button } from '@ui-kitten/components';
import { StyleSheet, View, Dimensions, BackHandler, FlatList } from 'react-native'
import { CloseIcon, SearchIcon } from '../../libs/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingIndicator } from './components/LoadingIndicator';
import { searchEvents } from '../../redux/services';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TeamLogoImage from '../../components/team-logo-image';

const screenWidth = Dimensions.get('window').width;

export default class SearchScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            items: [],
            loading: false,
            team: null,
            events: [],
            loadingEvents: false,
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

    searchEvents = () => {
        const { search, loading } = this.state;
        if (loading) return;
        this._Mounted && this.setState({ loading: true });
        searchEvents(search)
            .then(({ data }) => {
                const { success, result } = data;
                if (success) {
                    this._Mounted && this.setState({ loading: false, items: result });
                } else {
                    this._Mounted && this.setState({ loading: false, items: [] });
                }
            })
            .catch((error) => {
                this._Mounted && this.setState({ loading: false, items: [] });
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
                />
                <Button style={styles.searchButton}
                    onPress={this.searchEvents}
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

    renderEventsEmpty = () => {
        const { loadingEvents } = this.state;
        return (
            loadingEvents ? <LoadingIndicator style={styles.loadingIndicator} /> :
                <View style={styles.item}>
                    <Text style={styles.noResultText}>No Events.</Text>
                </View>
        )
    }

    setTeamName = (team) => {
        this._Mounted && this.setState({ team: team, loadingEvents: true });
    }

    renderItem = ({ item }) => {
        if (item.type == 'team') {
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
                        onPress={null}>
                        {item.favorite && <MaterialIcons name="star-rate" color='#fdcb04' size={18} />}
                        {!item.favorite && <MaterialIcons name="star-outline" color='#888' size={18} />}
                    </TouchableOpacity>
                </TouchableOpacity>
            );
        }
        return null;
    }

    render() {
        const { items, events, team } = this.state;

        return (
            <View style={styles.container}>
                {this.renderHeader()}
                {!team && <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, key) => key.toString()}
                    data={items}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.renderEmpty} />}
                {team && <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, key) => key.toString()}
                    data={events}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.renderEventsEmpty} />}
            </View>
        );
    }
};

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
        // fontWeight: 'bold',
        maxWidth: '70%',
        fontSize: 18,
        marginRight: 'auto'
    },
    toggleFavorite: {
        marginLeft: 'auto',
    },
});
