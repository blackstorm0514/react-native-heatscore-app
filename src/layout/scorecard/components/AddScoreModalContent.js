import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import { Button, Text, ViewPager } from '@ui-kitten/components';


import SelectTeamComponent from './SelectTeamComponent';
import SelectTypeComponent from './SelectTypeComponent';
import SelectTimeLineComponent from './SelectTimeLineComponent';
import SelectPointComponent from './SelectPointComponent';
import SelectEventComponent from './SelectEventComponent';
import Toast from 'react-native-simple-toast';
import { capitalizeString, getTimeLineName, truncateString } from "../../../libs/functions";
import ManageAlertComponent from "./ManageAlertComponent";
import { addScoreCard } from "../../../redux/services";

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
            selectedIndex: 1,
            event: event,
            team: null,
            type: null,
            timeline: null,
            points: null,
        });
    }

    onSelectType = (type) => {
        if (!type) {
            return Toast.show('Please select bet type.');
        }
        this.setState({
            type: type,
            selectedIndex: 2
        })
    }

    onSelectItem = (field, value) => {
        if (field == 'type') {
            this.setState({ [field]: value, team: null, points: null });
        } else {
            this.setState({ [field]: value });
        }
    }

    onSelectTeam = (team) => {
        if (!team) {
            return Toast.show('Please select a team.');
        }
        this.setState({
            team: team,
            selectedIndex: 3
        })
    }

    onSelectTimeline = (timeline) => {
        if (!timeline) {
            return Toast.show('Please select timeline.');
        }
        this.setState({
            timeline: timeline,
            selectedIndex: 4
        })
    }

    onSelectPoints = (points) => {
        if (!points) {
            return Toast.show('Please select points.');
        }
        this.setState({
            points: points,
            selectedIndex: 5
        })
    }

    onSubmit = async (alerts) => {
        const { onAddScoreCard } = this.props;
        const { event, team, type, timeline, points } = this.state;

        this._Mounted && this.setState({ submitting: true, ...alerts });
        addScoreCard({
            event_id: event.event_id, team, type, timeline, points,
            ...alerts
        })
            .then(({ data }) => {
                const { success, time, error } = data;
                if (success) {
                    onAddScoreCard(time);
                } else {
                    Toast.show(error);
                }
                this._Mounted && this.setState({ submitting: false });
            })
            .catch(error => {
                Toast.show('Cannot add a score card. Please try again later.');
                this._Mounted && this.setState({ submitting: false });
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
                style={{ backgroundColor: '#111', flex: 1 }}>
                <View style={styles.container} key="1">
                    <SelectEventComponent
                        onSelect={this.onSelectEvent} />
                </View>
                <View style={styles.container} key="2">
                    <SelectTypeComponent
                        type={type}
                        onNext={this.onSelectType}
                        onBack={() => this._Mounted && this.setState({ selectedIndex: 0 })} />
                </View>
                <View style={styles.container} key="3">
                    <SelectTeamComponent
                        event={event}
                        team={team}
                        type={type}
                        onNext={this.onSelectTeam}
                        onBack={() => this._Mounted && this.setState({ selectedIndex: 1 })} />
                </View>
                <View style={styles.container} key="4">
                    <SelectTimeLineComponent
                        event={event}
                        timeline={timeline}
                        onNext={this.onSelectTimeline}
                        onBack={() => this._Mounted && this.setState({ selectedIndex: 2 })} />
                </View>
                <View style={styles.container} key="5">
                    {type != 'moneyline' && <SelectPointComponent
                        points={points}
                        type={type}
                        onNext={this.onSelectPoints}
                        onBack={() => this._Mounted && this.setState({ selectedIndex: 3 })} />}
                    {type == 'moneyline' && <ManageAlertComponent
                        allowAlerts={allowAlerts}
                        alert_gameStart={alert_gameStart}
                        alert_gameEnd={alert_gameEnd}
                        alert_gameScoring={alert_gameScoring}
                        onNext={this.onSubmit}
                        onBack={() => this._Mounted && this.setState({ selectedIndex: 3 })}
                    />}
                </View>
                <View style={styles.container} key="6">
                    <ManageAlertComponent
                        allowAlerts={allowAlerts}
                        alert_gameStart={alert_gameStart}
                        alert_gameEnd={alert_gameEnd}
                        alert_gameScoring={alert_gameScoring}
                        onNext={this.onSubmit}
                        onBack={() => this._Mounted && this.setState({ selectedIndex: 4 })}
                        disabled={submitting}
                    />
                </View>
            </ViewPager>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})