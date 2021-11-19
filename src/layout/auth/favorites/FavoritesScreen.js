import React, { PureComponent } from 'react';
import { Layout, List, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native'
import FavoriteItemComponent from './components/FavoriteItemComponent';
import { ArrowIosBackIcon, PlusOutlineIcon } from '../../../components/icons';
import { LoadingIndicator } from '../../scores/components/LoadingIndicator';

export default class FavoritesScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            favorites: [],
        }
    }

    componentDidMount() {
        this.setState({ loading: false });
    }

    onItemPress = () => { };

    renderItem = ({ item }) => (
        <FavoriteItemComponent
            style={styles.item}
            message={item}
            onPress={this.onItemPress}
        />
    );

    renderHeader = () => (
        <Layout style={styles.header} level='1'>
            <Text category='s1'>My Favorites</Text>
        </Layout>
    );

    renderTitle = () => (
        <Text category="h6" style={styles.titleText}>Favorites</Text>
    )

    goBackAction = () => {
        const { navigation } = this.props;
        return (
            <TopNavigationAction
                icon={ArrowIosBackIcon}
                onPress={() => navigation.navigate('Profile')}
            />
        )
    }

    addFavoriteAction = () => {
        const { navigation } = this.props;
        return (
            <TopNavigationAction icon={(props) => {
                const { style, ...otherProps } = props;
                return <PlusOutlineIcon {...otherProps} style={[style, { tintColor: 'red' }]} />
            }} onPress={() => navigation.navigate('AddFavorite')} />
        )
    }

    render() {
        const { favorites, loading } = this.state;

        return (
            <View style={styles.container}>
                <TopNavigation
                    title={this.renderTitle}
                    accessoryLeft={this.goBackAction}
                    accessoryRight={this.addFavoriteAction}
                />
                {loading && <LoadingIndicator style={styles.loadingIndicator} />}
                {!loading && <List
                    style={styles.list}
                    data={favorites}
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.renderHeader}
                />}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111'
    },
    titleText: {
        fontWeight: 'bold'
    },
    list: {
        flex: 1,
        backgroundColor: '#111'
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: '#111'
    },
    item: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#222',
        backgroundColor: '#000'
    },
    loadingIndicator: {
        flex: 1
    },
});
