import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, List } from '@ui-kitten/components';
import RenderEventComponent from './RenderEventComponent';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ScoreCardComponent from './ScoreCardComponent';

const RenderFavoriteComponent = ({ navigation, favorites, scorecards }) => {
    const renderEvent = ({ item }) => {
        return (
            <RenderEventComponent event={item}
                navigation={navigation} />
        )
    }

    const renderScoreCard = ({item}) => {
        return (
            <ScoreCardComponent event={item}
                navigation={navigation} />
        )
    }

    const goToAddFavorite = () => {
        navigation.navigate('Auth', { screen: 'AddFavorite' });
    }

    const goToScoreCard = () => {
        navigation.navigate('Score Card');
    }

    return (
        <View style={styles.favoriteContainer}>
            {scorecards && scorecards.length > 0 && <View>
                <View style={styles.favoriteTitle}>
                    <Text style={styles.favoriteTitleText}>Score Card</Text>
                    <TouchableOpacity style={styles.addFavoriteButton}
                        onPress={goToScoreCard}
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
                    renderItem={renderScoreCard}
                />
            </View>}
            {favorites && favorites.length > 0 && <View>
                <View style={styles.favoriteTitle}>
                    <Text style={styles.favoriteTitleText}>Favorite</Text>
                    <TouchableOpacity style={styles.addFavoriteButton}
                        onPress={goToAddFavorite}
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
                    renderItem={renderEvent}
                />
            </View>}
        </View>
    )
}

export default RenderFavoriteComponent;


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
