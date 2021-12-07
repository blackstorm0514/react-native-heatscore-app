import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import SwitchToggle from "react-native-switch-toggle";

class ItemComponent extends PureComponent {
    render() {
        const { title, value, onPress } = this.props;
        return (
            <TouchableOpacity style={styles.toggleItemContainer} activeOpacity={0.8} onPress={onPress}>
                <Text style={styles.toggleItemTitle}>{title}</Text>
                <SwitchToggle
                    switchOn={value}
                    onPress={onPress}
                    circleColorOff='#CCC'
                    circleColorOn='#E10032'
                    backgroundColorOn='#333'
                    backgroundColorOff='#333'
                    containerStyle={styles.toggleContainerStyle}
                    circleStyle={styles.toggleCircleStyle}
                />
            </TouchableOpacity>
        )
    }
}

export default class ManageAlertComponent extends PureComponent {
    render() {
        const { allowAlerts, alert_gameStart, alert_gameEnd, alert_gameScoring, onSelect } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>MANAGE ALERTS</Text>
                </View>
                <View>
                    <ItemComponent
                        title="Allow Alerts"
                        isToggle
                        value={allowAlerts}
                        onPress={() => onSelect('allowAlerts', !allowAlerts)} />
                    <View style={{ marginTop: 10 }}>
                        <ItemComponent
                            title="Game Start"
                            isToggle
                            value={alert_gameStart}
                            onPress={() => onSelect('alert_gameStart', !alert_gameStart)} />
                        <ItemComponent
                            title="Game End"
                            isToggle
                            value={alert_gameEnd}
                            onPress={() => onSelect('alert_gameEnd', !alert_gameEnd)} />
                        <ItemComponent
                            title="Every Scoring Play"
                            isToggle
                            value={alert_gameScoring}
                            onPress={() => onSelect('alert_gameScoring', !alert_gameScoring)} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    titleContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 6
    },
    titleText: {
        fontSize: 12,
        color: '#999'
    },
    toggleCircleStyle: {
        width: 14,
        height: 14,
        borderRadius: 7,
    },
    toggleContainerStyle: {
        width: 30,
        height: 16,
        borderRadius: 10,
        padding: 2,
    },
    toggleItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
        paddingVertical: 6,
        alignItems: 'center',
        borderBottomColor: '#222',
        borderBottomWidth: 1,
    },
    toggleItemTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: 'white'
    },
    actionsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-evenly'
    },
    buttonStyle: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 4
    },
    buttonText: {
        color: '#FFF',
        fontSize: 14
    },
    buttonNext: {
        backgroundColor: '#E10032',
    },
    buttonBack: {
        backgroundColor: '#333',
    },
})