import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import { PlusOutlineIcon } from '../../../components/icons';

export default class RenderFavoriteComponent extends Component {
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
                        accessoryLeft={PlusOutlineIcon} />
                </View>
                <Text style={styles.addFavoriteText}>Add Favorites</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    favoriteContainer: {
        paddingBottom: 15
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
    addFavoriteText: {
        color: 'white',
        textTransform: 'uppercase',
        alignSelf: 'center',
        marginTop: 15,
        fontWeight: 'bold'
    },
});
