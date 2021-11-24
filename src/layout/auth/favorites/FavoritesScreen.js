import React, { PureComponent } from 'react';
import { Layout, List, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { StyleSheet, View, BackHandler } from 'react-native'
import FavoriteItemComponent from './components/FavoriteItemComponent';
import { ArrowIosBackIcon, PlusOutlineIcon } from '../../../components/icons';
import { LoadingIndicator } from '../../scores/components/LoadingIndicator';
import { connect } from 'react-redux';
import { getFavorites, removeFavorite } from '../../../redux/services';
import { actions } from '../../../redux/reducer';
import Toast from 'react-native-simple-toast';

class FavoritesScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
        const { setFavoritesAction, navigation } = this.props;
        this.setState({ loading: true });
        getFavorites()
            .then(({ data }) => {
                const { success, favorites, error } = data;
                if (success) {
                    setFavoritesAction(favorites);
                    this.setState({ loading: false });
                } else {
                    this.setState({ loading: false });
                    Toast.show(error);
                }
            })
            .catch((error) => {
                // console.warn(error);
                this.setState({ loading: false });
                Toast.show('Cannot get favorite teams.');
            });

        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => { navigation.navigate('Profile'); return true; }
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    onRemoveFavorites = (sport, team) => {
        const { removeFavoritesAction } = this.props;
        removeFavorite(sport, team)
            .then(({ data }) => {
                const { success, error } = data;
                if (success) {
                    removeFavoritesAction({ sport, team });
                    Toast.show('Successfully removed');
                } else {
                    Toast.show(error);
                }
            })
            .catch(() => {
                Toast.show('Cannot remove favorite team. Please try again later.');
            })
    };

    renderItem = ({ item }) => {
        return (
            <FavoriteItemComponent
                style={styles.item}
                team={item.team}
                sport={item.sport}
                onPress={this.onRemoveFavorites}
            />
        );
    }

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
        const { loading } = this.state;
        const { favorites } = this.props;

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

const mapStateToProps = (state) => ({
    favorites: state.favorites,
});

export default connect(mapStateToProps, {
    setFavoritesAction: actions.setFavoritesAction,
    removeFavoritesAction: actions.removeFavoritesAction
})(FavoritesScreen);

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
