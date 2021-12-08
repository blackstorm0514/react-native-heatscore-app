import React, { Component } from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import { Text } from '@ui-kitten/components';
import { getEventIcons } from './getEventIcons';

export default class GameEventsComponent extends Component {
    renderEventItem = (event, index) => {
        const { sport, home } = this.props;
        const eventIcon = getEventIcons(sport, event.text);
        const homeEvent = event.text.search(home.name) != -1;
        return (
            <View key={index.toString()} style={styles.eventItemContainer}>
                <Text></Text>
                {eventIcon && <Image source={eventIcon} style={styles.eventItemIcon} />}
                <Text style={styles.eventItemText}>{event.text}</Text>
            </View>
        )
    }

    render() {
        const { events, home, away } = this.props;
        const filteredEvents = events.filter(event => event.text.search(home.name) != -1 || event.text.search(away.name) != -1)

        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Events</Text>
                {filteredEvents.map(this.renderEventItem)}
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
    eventItemContainer: {
        flexDirection: 'row',
        paddingVertical: 4,
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    eventItemText: {
        fontSize: 13,
        marginLeft: 10,
        color: '#aaa',
        marginLeft: 'auto'
    },
    eventItemIcon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        marginLeft: 'auto'
    }
});
