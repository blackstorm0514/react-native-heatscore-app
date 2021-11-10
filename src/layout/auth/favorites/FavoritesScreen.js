import React, { PureComponent } from 'react';
import { Layout, List, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native'
import MessageItemComponent from './components/MessageItemComponent';
import { ArrowIosBackIcon, PlusOutlineIcon } from '../../../components/icons';

export default class FavoritesScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            favorites: [1, 2, 3, 4],
        }
    }

    onItemPress = () => { };

    renderItem = (info) => (
        <MessageItemComponent
            style={styles.item}
            message={info.item}
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
        return (
            <TopNavigationAction icon={(props) => {
                const { style, ...otherProps } = props;
                return <PlusOutlineIcon {...otherProps} style={[style, { tintColor: 'red' }]} />
            }
            } />
        )
    }

    render() {
        const { favorites } = this.state;

        return (
            <View style={styles.container}>
                <TopNavigation
                    title={this.renderTitle}
                    accessoryLeft={this.goBackAction}
                    accessoryRight={this.addFavoriteAction}
                />
                <List
                    style={styles.list}
                    data={favorites}
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
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
});
