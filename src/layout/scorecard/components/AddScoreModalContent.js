import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Button, Text, ViewPager } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SelectTeamComponent from './SelectTeamComponent';
import SelectTypeComponent from './SelectTypeComponent';
import SelectTimeLineComponent from './SelectTimeLineComponent';
import SelectPointComponent from './SelectPointComponent';
import SelectEventComponent from './SelectEventComponent';
import Toast from 'react-native-simple-toast';
import { capitalizeString, getTimeLineName, truncateString } from "../../../libs/functions";
import ManageAlertComponent from "./ManageAlertComponent";
import { addScoreCard } from "../../../redux/services";

const screenHeight = Dimensions.get('screen').height;

export default class AddScoreModalContent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,

            event: null,
            team: null,
            type: null,
            timeline: null,
            points: null,
            allowAlerts: true,
            alert_gameStart: true,
            alert_gameEnd: true,
            alert_gameScoring: false,

            submitting: false,
        };
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    onSelectEvent = (event) => {
        this._Mounted && this.setState({
            selectedIndex: 0,
            event: event,
            team: null,
            type: null,
            timeline: null,
            points: null,
        });
    }

    onSelectType = (type) => {
        if (!type) { return Toast.show('Please select bet type.'); }
        this.setState({ type: type })
    }

    onSelectTeam = (team) => {
        if (!team) { return Toast.show('Please select a team.'); }
        this.setState({ team: team })
    }

    onSelectTimeline = (timeline) => {
        if (!timeline) { return Toast.show('Please select timeline.'); }
        this.setState({ timeline: timeline })
    }

    onSelectPoints = (points) => {
        this.setState({ points: points })
    }

    onChangeAlerts = (key, value) => {
        this.setState({ [key]: value });
    }

    getSnapshotBeforeUpdate(prevProps) {
        return { shouldSubmit: !prevProps.submit && this.props.submit };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot.shouldSubmit) {
            // console.log('submit')
            this.onSubmit();
        }
    }

    onSubmit = async () => {
        const { onAddScoreCard } = this.props;
        const {
            event,
            team,
            type,
            timeline,
            points,
            allowAlerts,
            alert_gameStart,
            alert_gameEnd,
            alert_gameScoring
        } = this.state;

        if (!event) {
            onAddScoreCard(null);
            return Toast.show('Please select a game.');
        }
        if (!type) {
            onAddScoreCard(null);
            return Toast.show('Please select bet type.');
        }
        if (!team) {
            onAddScoreCard(null);
            return Toast.show('Please select a team.');
        }
        if (!timeline) {
            onAddScoreCard(null);
            return Toast.show('Please select timeline.');
        }
        if (!points && ['total', 'spread'].includes(type)) {
            onAddScoreCard(null);
            return Toast.show('Please select points.');
        }

        this._Mounted && this.setState({ submitting: true });
        addScoreCard({
            event_id: event.event_id, team, type, timeline, points,
            allowAlerts,
            alert_gameStart,
            alert_gameEnd,
            alert_gameScoring
        })
            .then(({ data }) => {
                const { success, time, error } = data;
                if (success) {
                    onAddScoreCard(time);
                } else {
                    Toast.show(error);
                    onAddScoreCard(null);
                }
                this._Mounted && this.setState({ submitting: false });
            })
            .catch(error => {
                Toast.show('Cannot add a score card. Please try again later.');
                this._Mounted && this.setState({ submitting: false });
                onAddScoreCard(null);
            })
    }

    render() {
        const { event, team, type, timeline, points,
            allowAlerts, alert_gameStart, alert_gameEnd, alert_gameScoring,
            submitting, selectedIndex
        } = this.state;

        return (
            <ViewPager selectedIndex={selectedIndex}
                swipeEnabled={false}
                style={{ backgroundColor: '#121212', flex: 1 }}>
                <View style={styles.container} key="1">
                    <TouchableOpacity style={styles.itemContainer}
                        activeOpacity={0.8}
                        onPress={() => this._Mounted && this.setState({ selectedIndex: 1 })}>
                        <Text style={styles.itemTitleText}>GAME</Text>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemContentText}>{event ? `${truncateString(event.home.name)} VS ${truncateString(event.away.name)}` : 'Select'}</Text>
                            <FontAwesomeIcon style={styles.itemContentIcon} color='#999' size={18} name='angle-right' />
                        </View>
                    </TouchableOpacity>
                    <SelectTypeComponent
                        type={type}
                        onSelect={this.onSelectType} />
                    <SelectTeamComponent
                        event={event}
                        team={team}
                        type={type}
                        onSelect={this.onSelectTeam}
                    />
                    <SelectTimeLineComponent
                        event={event}
                        timeline={timeline}
                        onSelect={this.onSelectTimeline}
                    />
                    <SelectPointComponent
                        points={points}
                        type={type}
                        onSelect={this.onSelectPoints}
                    />
                    <ManageAlertComponent
                        allowAlerts={allowAlerts}
                        alert_gameStart={alert_gameStart}
                        alert_gameEnd={alert_gameEnd}
                        alert_gameScoring={alert_gameScoring}
                        onSelect={this.onChangeAlerts}
                        disabled={submitting}
                    />
                </View>
                <SelectEventComponent key="2"
                    onSelect={this.onSelectEvent} />
            </ViewPager>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 10,
        minHeight: screenHeight - 140
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        alignItems: 'center',
        borderBottomColor: '#222',
        borderBottomWidth: 1,
    },
    itemTitleText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white'
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    itemContentText: {
        fontSize: 14,
        fontWeight: '100',
        color: '#999',
        alignItems: 'center',
        alignContent: 'center'
    },
    itemContentIcon: {
        marginLeft: 8
    },
})