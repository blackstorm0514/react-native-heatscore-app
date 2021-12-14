import React, { Component } from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import { Text } from '@ui-kitten/components';
import { getEventIcons } from '../../../../libs/getEventIcons';
import { removeTeamNameFromEvent } from '../../../../libs/functions';
import Timeline from '../../../../components/Timeline';
import TeamLogoImage from '../../../../components/team-logo-image';

export default class GameSoccerEventsComponent extends Component {
    renderDetail(rowData, sectionID, rowID) {
        return (
            <View style={{ flex: 1 }}>
                <Text style={[styles.eventText]}>{rowData.text}</Text>
            </View>
        )
    }

    render() {
        const { events, home, away, sport } = this.props;
        const filteredEvents = events.filter(event => event.text.search(home.name) != -1 || event.text.search(away.name) != -1)
        const data = filteredEvents.map(event => {
            const homeEvent = event.text.search(home.name) != -1;
            const eventIcon = getEventIcons(sport, event.text);
            if (!eventIcon) return null;
            const text = removeTeamNameFromEvent(event.text, homeEvent ? home.name : away.name);
            return {
                time: "",
                text: text,
                lineColor: '#444',
                icon: eventIcon,
                position: homeEvent ? 'left' : 'right',
            }
        }).filter(event => event);
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Events</Text>
                <View style={styles.teamLogos}>
                    <TeamLogoImage image_id={home.image_id} size={24} style={null} />
                    <Text style={styles.timelineText}>Timeline</Text>
                    <TeamLogoImage image_id={away.image_id} size={24} style={null} />
                </View>
                <Timeline
                    data={data}
                    renderDetail={this.renderDetail}
                    innerCircle="icon"
                    columnFormat="two-column"
                    circleSize={16}
                    lineWidth={1}
                    iconStyle={styles.iconStyle}
                    circleStyle={styles.circleStyle}
                    circleSize={24}
                />
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
        borderColor: '#4445',
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    eventText: {
        color: '#ddd',
        fontSize: 12
    },
    teamLogos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    timelineText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold'
    },
    iconStyle: {
        width: 16,
        height: 16,
    },
    circleStyle: {
        backgroundColor: '#222',
        borderColor: '#666',
        borderWidth: 1,
        padding: 10,
        borderRadius: 12
    }
});
