import React, { PureComponent } from 'react';
import { Layout, List, Text, TopNavigation, Input, Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native'
import FavoriteItemComponent from './components/FavoriteItemComponent';
import { CloseIcon, SearchIcon } from '../../../components/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingIndicator } from '../../scores/components/LoadingIndicator';

export default class AddFavoritesScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            items: [],
            loading: false,
        }
    }

    componentDidMount() {
        this.setState({ loading: false });
    }

    onItemPress = () => { };

    renderItem = ({ item }) => (
        <FavoriteItemComponent
            style={styles.item}
            team={item}
            onPress={this.onItemPress}
        />
    );

    customSearchIcon = () => {
        return <SearchIcon style={styles.searchIcon} />
    }

    customClearIcon = () => {
        const { search } = this.state;
        return search ? <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({ search: '' })}>
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
                    onChangeText={(search) => this.setState({ search })}
                    accessoryLeft={this.customSearchIcon}
                    accessoryRight={this.customClearIcon}
                />
                <Button style={styles.searchButton}
                    onPress={this.searchTeams}
                    size='large'>Done</Button>
            </View>
        );
    }

    searchTeams = () => {
        const { search } = this.state;
        if (search) {
            this.setState({ loading: true, items: [] });
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
        const { items: favorites, loading } = this.state;

        return (
            <View style={styles.container}>
                <List
                    style={styles.list}
                    data={favorites}
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.renderHeader}
                    ListEmptyComponent={this.renderEmpty}
                />
            </View>
        );
    }
};

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
        paddingVertical: 16,
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
        // alignSelf: 'baseline',
        // width: '100%',
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
        textAlign: 'center'
    }
});
