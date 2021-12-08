import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Text } from '@ui-kitten/components';

export default class GameDetailComponent extends Component {
    render() {
        const { extra, home, away } = this.props;
        const { away_manager, home_manager, referee, stadium_data } = extra;
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Game Details</Text>
                {stadium_data && <View style={styles.rowContainer}>
                    <Text style={styles.itemTitle}>{stadium_data.city}, {stadium_data.country}</Text>
                    <Text style={styles.itemDescription}>{stadium_data.name}</Text>
                </View>}
                {referee && <View style={styles.rowContainer}>
                    <Text style={styles.itemTitle}>Refree</Text>
                    <Text style={styles.itemDescription}>{referee.name} ({referee.cc.toUpperCase()})</Text>
                </View>}
                {home_manager && <View style={styles.rowContainer}>
                    <Text style={styles.itemTitle}>Home Manager</Text>
                    <Text style={styles.itemDescription}>{home_manager.name}</Text>
                </View>}
                {away_manager && <View style={styles.rowContainer}>
                    <Text style={styles.itemTitle}>Away Manager</Text>
                    <Text style={styles.itemDescription}>{away_manager.name}</Text>
                </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingRight: 10,
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderColor: '#4445'
    },
    rowContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    itemTitle: {
        fontSize: 12,
        color: '#999'
    },
    itemDescription: {
        fontSize: 13,
        color: '#FFF'
    }
});
