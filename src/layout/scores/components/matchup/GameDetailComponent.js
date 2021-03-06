import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';

const GameDetailComponent = ({ extra }) => {
    const { away_manager, home_manager, referee, stadium_data, away_pos, home_pos, round } = extra;
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Game Details</Text>
            {stadium_data && <View style={styles.rowContainer}>
                <Text style={styles.itemTitle}>{stadium_data.city}, {stadium_data.country}</Text>
                <Text style={styles.itemDescription}>{stadium_data.name}</Text>
            </View>}
            {home_pos && <View style={styles.rowContainer}>
                <Text style={styles.itemTitle}>Home Pos</Text>
                <Text style={styles.itemDescription}>{home_pos}</Text>
            </View>}
            {away_pos && <View style={styles.rowContainer}>
                <Text style={styles.itemTitle}>Away Pos</Text>
                <Text style={styles.itemDescription}>{away_pos}</Text>
            </View>}
            {round && <View style={styles.rowContainer}>
                <Text style={styles.itemTitle}>Round</Text>
                <Text style={styles.itemDescription}>{round}</Text>
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

export default GameDetailComponent;

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
