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

class ItemComponent extends PureComponent {
    render() {
        const { title, isText, isToggle, value, onPress } = this.props;
        return (
            <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8} onPress={isToggle ? null : onPress}>
                <Text style={styles.itemTitleText}>{title}</Text>
                {isText && <View style={styles.itemContent}>
                    <Text style={styles.itemContentText}>{isText}</Text>
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
            event: null,
            team: null,
            type: null,
            timeline: null,
            points: null,
            allowAlerts: true,
            alert_gameStart: true,
            alert_gameEnd: true,
            alert_gameScoring: false,
            selectedIndex: 0,
            selectedTab: null,
        };
    }

    renderTabsForEvent = () => {
        const { selectedTab } = this.state;
        switch (selectedTab) {
            case 'event':
                return (
                    <SelectEventComponent
                        onBack={() => this.setState({ selectedTab: null, selectedIndex: 0 })}
                        onSelect={(event) => this.setState({ selectedTab: null, selectedIndex: 0, event: event })} />
                );
            case 'team':
                return (
                    <SelectTeamComponent
                        onBack={() => this.setState({ selectedTab: null, selectedIndex: 0 })} />
                );
            case 'type':
                return (
                    <SelectTypeComponent
                        onBack={() => this.setState({ selectedTab: null, selectedIndex: 0 })} />
                );
            case 'timeline':
                return (
                    <SelectTimeLineComponent
                        onBack={() => this.setState({ selectedTab: null, selectedIndex: 0 })} />
                );
            case 'points':
                return (
                    <SelectPointComponent
                        onBack={() => this.setState({ selectedTab: null, selectedIndex: 0 })} />
                );
            default:
                return null;
        }
    }

    render() {
        const {
            event, team, type, timeline, points,
            allowAlerts, alert_gameStart, alert_gameEnd, alert_gameScoring,
            selectedIndex,
        } = this.state;
        return (
            <ViewPager selectedIndex={selectedIndex}
                swipeEnabled={false}
                style={{ backgroundColor: '#111', flex: 1 }}
            >
                <View style={styles.container} key="1">
                    <ItemComponent
                        title="Game"
                        isText="Select"
                        onPress={() => this.setState({ selectedIndex: 1, selectedTab: 'event' })} />
                    <ItemComponent
                        title="Team"
                        isText="Vancouver"
                        onPress={() => this.setState({ selectedIndex: 1, selectedTab: 'team' })} />
                    <ItemComponent
                        title="Type"
                        isText="Spread"
                        onPress={() => this.setState({ selectedIndex: 1, selectedTab: 'type' })} />
                    <ItemComponent
                        title="Time Line"
                        isText="Half Time"
                        onPress={() => this.setState({ selectedIndex: 1, selectedTab: 'timeline' })} />
                    <ItemComponent
                        title="Spread"
                        isText="+1.5"
                        onPress={() => this.setState({ selectedIndex: 1, selectedTab: 'points' })} />

                    <Text style={styles.partText}>Manage Alerts</Text>
                    <ItemComponent
                        title="Allow Alerts"
                        isToggle
                        value={allowAlerts}
                        onPress={() => this.setState({ allowAlerts: !allowAlerts })} />

                    <Text style={styles.partText}>Manage Alerts</Text>
                    <ItemComponent
                        title="Game Start"
                        isToggle
                        value={alert_gameStart}
                        onPress={() => this.setState({ alert_gameStart: !alert_gameStart })} />
                    <ItemComponent
                        title="Game End"
                        isToggle
                        value={alert_gameEnd}
                        onPress={() => this.setState({ alert_gameEnd: !alert_gameEnd })} />
                    <ItemComponent
                        title="Every Scoring Play"
                        isToggle
                        value={alert_gameScoring}
                        onPress={() => this.setState({ alert_gameScoring: !alert_gameScoring })} />
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