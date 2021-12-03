import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import { Button, Text, ViewPager } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SwitchToggle from "react-native-switch-toggle";
import SelectTeamComponent from './SelectTeamComponent';
import SelectTypeComponent from './SelectTypeComponent';
import SelectTimeLineComponent from './SelectTimeLineComponent';
import SelectPointComponent from './SelectPointComponent';
import SelectEventComponent from './SelectEventComponent';
import Toast from 'react-native-simple-toast';
import { capitalizeString, getTimeLineName, truncateString } from "../../../libs/functions";

class ItemComponent extends PureComponent {
    render() {
        const { title, isText, isToggle, value, onPress } = this.props;
        return (
            <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8} onPress={isToggle ? null : onPress}>
                <Text style={styles.itemTitleText}>{title}</Text>
                {isText && <View style={styles.itemContent}>
                    <Text style={styles.itemContentText}>{value}</Text>
                    <FontAwesomeIcon style={styles.itemContentIcon} color='#999' size={18} name='angle-right' />
                </View>}
                {isToggle && <SwitchToggle
                    switchOn={value}
                    onPress={onPress}
                    circleColorOff='#CCC'
                    circleColorOn='#E10032'
                    backgroundColorOn='#333'
                    backgroundColorOff='#333'
                    containerStyle={styles.toggleContainerStyle}
                    circleStyle={styles.toggleCircleStyle}
                />}
            </TouchableOpacity>
        )
    }
}

export default class AddScoreModalContent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            selectedTab: null,
        };
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    selectEventPressed = () => {
        this._Mounted && this.setState({ selectedIndex: 1, selectedTab: 'event' });
    }

    selectItemPressed = (tab) => {
        const { event } = this.props;
        if (!event) {
            Toast.show('You should select an event to choose team.');
            return;
        }
        this._Mounted && this.setState({ selectedIndex: 1, selectedTab: tab });
    }

    selectTeamPressed = () => {
        const { event, type } = this.props;
        if (!event) {
            return Toast.show('You should select an event to choose team.');
        }
        if (!type) {
            return Toast.show('You should select a bet type to choose team.');
        }
        this._Mounted && this.setState({ selectedIndex: 1, selectedTab: 'team' });
    }

    selectPointsPressed = () => {
        const { event, type } = this.props;
        if (!event) {
            Toast.show('You should select an event to choose points.');
            return;
        }
        if (!['total', 'spread'].includes(type)) {
            Toast.show('Points are available in only Total and Spread type.');
            return;
        }
        this._Mounted && this.setState({ selectedIndex: 1, selectedTab: 'points' });
    }

    onSelectEvent = (event) => {
        const { updateEvent } = this.props;
        this._Mounted && this.setState({
            selectedTab: null,
            selectedIndex: 0,
        });
        updateEvent({
            event: event,
            team: null,
            type: null,
            timeline: null,
            points: null,
        });
    }

    onSelectItem = (field, value) => {
        const { updateEvent } = this.props;
        if (field == 'type') {
            updateEvent({ [field]: value, team: null, points: null });
        } else {
            updateEvent({ [field]: value });
        }
    }

    renderTabsForEvent = () => {
        const { selectedTab } = this.state;
        const { event, team, type, timeline, points } = this.props;
        switch (selectedTab) {
            case 'event':
                return (
                    <SelectEventComponent
                        onBack={() => this._Mounted && this.setState({ selectedTab: null, selectedIndex: 0 })}
                        onSelect={this.onSelectEvent} />
                );
            case 'type':
                return (
                    <SelectTypeComponent
                        type={type}
                        onBack={() => this._Mounted && this.setState({ selectedTab: null, selectedIndex: 0 })}
                        onSelect={(type) => this.onSelectItem('type', type)} />
                );
            case 'team':
                return (
                    <SelectTeamComponent
                        event={event}
                        team={team}
                        type={type}
                        onBack={() => this._Mounted && this.setState({ selectedTab: null, selectedIndex: 0 })}
                        onSelect={(team) => this.onSelectItem('team', team)} />
                );
            case 'timeline':
                return (
                    <SelectTimeLineComponent
                        event={event}
                        timeline={timeline}
                        onBack={() => this._Mounted && this.setState({ selectedTab: null, selectedIndex: 0 })}
                        onSelect={(timeline) => this.onSelectItem('timeline', timeline)} />
                );
            case 'points':
                return (
                    <SelectPointComponent
                        points={points}
                        onBack={() => this._Mounted && this.setState({ selectedTab: null, selectedIndex: 0 })}
                        onSelect={(points) => this.onSelectItem('points', points)} />
                );
            default:
                return null;
        }
    }

    getSelectedTeam = () => {
        const { event, team, type } = this.props;
        if (!event || !team || !type) return 'Select';
        if (type == 'total') {
            return team == 'home' ? 'Over' : 'Under';
        }
        return event[team].name;
    }

    render() {
        const { selectedIndex } = this.state;
        const { event, team, type, timeline, points,
            allowAlerts, alert_gameStart, alert_gameEnd, alert_gameScoring
        } = this.props;

        return (
            <ViewPager selectedIndex={selectedIndex}
                swipeEnabled={false}
                style={{ backgroundColor: '#111', flex: 1 }}
            >
                <View style={styles.container} key="1">
                    <ItemComponent
                        title="Game"
                        isText={true}
                        value={event ? `${truncateString(event.home.name)} vs ${truncateString(event.away.name)}` : "Select"}
                        onPress={this.selectEventPressed} />
                    <ItemComponent
                        title="Type"
                        isText={true}
                        value={type ? capitalizeString(type) : 'Select'}
                        onPress={() => this.selectItemPressed('type')} />
                    <ItemComponent
                        title="Team"
                        isText={true}
                        value={this.getSelectedTeam()}
                        onPress={this.selectTeamPressed} />
                    <ItemComponent
                        title="Time Line"
                        isText={true}
                        value={timeline ? getTimeLineName(timeline) : 'Select'}
                        onPress={() => this.selectItemPressed('timeline')} />
                    {type != 'moneyline' && <ItemComponent
                        title="Points"
                        isText={true}
                        value={points ? points : 'Select'}
                        onPress={this.selectPointsPressed} />}

                    <Text style={styles.partText}>Manage Alerts</Text>
                    <ItemComponent
                        title="Allow Alerts"
                        isToggle
                        value={allowAlerts}
                        onPress={() => this.onSelectItem('allowAlerts', !allowAlerts)} />

                    <Text style={styles.partText}>Manage Alerts</Text>
                    <ItemComponent
                        title="Game Start"
                        isToggle
                        value={alert_gameStart}
                        onPress={() => this.onSelectItem('alert_gameStart', !alert_gameStart)} />
                    <ItemComponent
                        title="Game End"
                        isToggle
                        value={alert_gameEnd}
                        onPress={() => this.onSelectItem('alert_gameEnd', !alert_gameEnd)} />
                    <ItemComponent
                        title="Every Scoring Play"
                        isToggle
                        value={alert_gameScoring}
                        onPress={() => this.onSelectItem('alert_gameScoring', !alert_gameScoring)} />
                </View>

                <View style={styles.selectContainer} key="2">
                    {this.renderTabsForEvent()}
                </View>
            </ViewPager>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#111',
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 10
    },
    selectContainer: {
        backgroundColor: '#111',
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
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
    partText: {
        textTransform: 'uppercase',
        fontSize: 10,
        marginTop: 20,
    },
    toggleCircleStyle: {
        width: 16,
        height: 16,
        borderRadius: 8,
    },
    toggleContainerStyle: {
        width: 36,
        height: 20,
        borderRadius: 10,
        padding: 2,
    },
    subView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        height: 100,
    }
})