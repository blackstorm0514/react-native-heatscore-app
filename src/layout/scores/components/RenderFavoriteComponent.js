import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Button, Text, List } from '@ui-kitten/components';
import { PlusOutlineIcon } from '../../../libs/icons';
import RenderEventComponent from './RenderEventComponent';

export default class RenderFavoriteComponent extends Component {
    renderEvent = ({ item }) => {
        const { navigation } = this.props;
        return (
            <RenderEventComponent event={item}
                navigation={navigation} />
        )
    }

    goToAddFavorite = () => {
        const { navigation } = this.props;
        navigation.navigate('Auth', { screen: 'AddFavorite' });
    }

    render() {
        const { favorites } = this.props;

        return (
            <View style={styles.favoriteContainer}>
                <View style={styles.favoriteTitle}>
                    <Text style={styles.favoriteTitleText}>Favorite</Text>
                    <Button style={styles.addFavoriteButton}
                        appearance='ghost'
                        status='danger'
                        size='medium'
                        onPress={this.goToAddFavorite}
                        accessoryLeft={PlusOutlineIcon} />
                </View>
                <List
                    style={styles.list}
                    data={favorites}
                    renderItem={this.renderEvent}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    favoriteContainer: {
        paddingBottom: 0
    },
    favoriteTitle: {
        backgroundColor: '#222',
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#888',
        borderBottomWidth: 2
    },
    favoriteTitleText: {
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingTop: 10
    },
    addFavoriteButton: {
        width: 20,
        height: 20,
        alignSelf: 'flex-end'
    },
    list: {
        backgroundColor: 'black',
    },
});
