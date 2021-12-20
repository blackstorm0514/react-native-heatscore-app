import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, List } from '@ui-kitten/components';
import RenderEventComponent from './RenderEventComponent';
import FeatherIcon from 'react-native-vector-icons/Feather';

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

    goToScoreCard = () => {
        const { navigation } = this.props;
        navigation.navigate('Score Card');
    }

    render() {
        const { favorites, scorecards } = this.props;

        return (
            <View style={styles.favoriteContainer}>
                {favorites && favorites.length > 0 && <View>
                    <View style={styles.favoriteTitle}>
                        <Text style={styles.favoriteTitleText}>Favorite</Text>
                        <TouchableOpacity style={styles.addFavoriteButton}
                            onPress={this.goToAddFavorite}
                            activeOpacity={0.8}>
                            <FeatherIcon size={20}
                                color='red'
                                name='plus' />
                        </TouchableOpacity>
                    </View>
                    <List
                        listKey='favorites'
                        style={styles.list}
                        data={favorites}
                        renderItem={this.renderEvent}
                    />
                </View>}
                {scorecards && scorecards.length > 0 && <View>
                    <View style={styles.favoriteTitle}>
                        <Text style={styles.favoriteTitleText}>Score Cards</Text>
                        <TouchableOpacity style={styles.addFavoriteButton}
                            onPress={this.goToScoreCard}
                            activeOpacity={0.8}>
                            <FeatherIcon size={20}
                                color='red'
                                name='plus' />
                        </TouchableOpacity>
                    </View>
                    <List
                        listKey='scorecards'
                        style={styles.list}
                        data={scorecards}
                        renderItem={this.renderEvent}
                    />
                </View>}
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
        paddingVertical: 4,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#888',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    favoriteTitleText: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: '500',
        fontSize: 14
    },
    addFavoriteButton: {
        alignSelf: 'flex-end'
    },
    list: {
        backgroundColor: '#121212',
    },
});
