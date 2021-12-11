import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '@ui-kitten/components';
import { LoadingIndicator } from '../../scores/components/LoadingIndicator';
import { getEvent } from '../../../redux/services';
import { getStatusString, getTimeString } from '../../../libs/functions';

export default class SelectEventPerDayComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: null,
        }
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
        this.getEventsData();
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    getEventsData = (setLoading = true) => {
        const { date, sport, league } = this.props;
        this._Mounted && this.setState({ loading: setLoading });
        getEvent(date, sport, league)
            .then(({ data: result }) => {
                const { data } = result;
                this._Mounted && this.setState({
                    loading: false,
                    data: data,
                });
            })
            .catch(() => {
                this._Mounted && this.setState({ loading: false, data: null });
            })
    }

    renderContents = () => {
        const { data, loading } = this.state;
        const { onSelect } = this.props;
        if (loading) {
            return (
                <LoadingIndicator style={styles.loadingIndicator} />
            );
        }
        if (!data || !data.length) {
            return (
                <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 16, marginTop: 20 }}>There are no events.</Text>
                </View>
            );
        }
        return data.map((league, index) => {
            const { events, sport, name } = league;
            if (!events || events.length == 0) return null;
            return (
                <View key={index}>
                    <View style={styles.leagueTitle}>
                        <Text style={styles.leagueTitleText} numberOfLines={1}> {name}</Text>
                    </View>
                    {events.map((event, index) => {
                        if (!event) return null;
                        const { home, away, time, time_status, timer, sport } = event;
                        const { status_class, status_text } = getStatusString(time_status, timer, sport);
                        const time_str = getTimeString(timer, time, time_status);
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.eventItem}
                                activeOpacity={0.6}
                                onPress={() => onSelect(event)}>
                                <View style={styles.eventItemDetail}>
                                    <View style={styles.eventItemTeam}>
                                        {home.image_id && <Image
                                            style={styles.teamLogoImage}
                                            source={{ uri: `https://assets.b365api.com/images/team/m/${home.image_id}.png` }}
                                        />}
                                        <Text style={styles.eventItemTeamName} numberOfLines={1}>{home.name}</Text>
                                    </View>
                                    <View style={styles.eventItemTeam}>
                                        {away.image_id && <Image
                                            style={styles.teamLogoImage}
                                            source={{ uri: `https://assets.b365api.com/images/team/m/${away.image_id}.png` }}
                                        />}
                                        <Text style={styles.eventItemTeamName} numberOfLines={1}>{away.name}</Text>
                                    </View>
                                </View>
                                <View style={styles.eventItemStatus}>
                                    {time_str && <Text style={[status_class, styles.eventItemStatusText]}>{time_str}</Text>}
                                    {status_text &&
                                        <Text style={[status_class, styles.eventItemStatusText]} numberOfLines={1}>{status_text}</Text>}
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.renderContents()}
            </ScrollView>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: 10,
    },
    loadingIndicator: {
        flex: 1
    },
    leagueTitle: {
        backgroundColor: '#222',
        paddingVertical: 4,
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderBottomColor: '#888',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    leagueTitleText: {
        color: '#E10032',
        fontWeight: '500',
        maxWidth: '70%',
        fontSize: 12,
        marginLeft: 5
    },
    eventItem: {
        flexDirection: 'row',
        marginHorizontal: 10,
        borderBottomColor: '#222',
        borderBottomWidth: 1,
        paddingVertical: 4
    },
    eventItemDetail: {
        flex: 5,
    },
    eventItemTeam: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2
    },
    teamLogoImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        flex: 1
    },
    eventItemTeamName: {
        flex: 5,
        fontSize: 15,
        fontWeight: '400',
        marginLeft: 10
    },
    eventItemStatus: {
        flex: 2,
        justifyContent: 'center'
    },
    eventItemStatusText: {
        fontSize: 12,
        marginVertical: 3,
        textAlign: 'right',
        overflow: 'hidden'
    },
});
