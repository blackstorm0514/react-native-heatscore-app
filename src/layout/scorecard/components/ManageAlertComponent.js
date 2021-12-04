import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import SwitchToggle from "react-native-switch-toggle";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

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
    constructor(props) {
        super(props);
        this.state = {
            allowAlerts: props.allowAlerts,
            alert_gameStart: props.alert_gameStart,
            alert_gameEnd: props.alert_gameEnd,
            alert_gameScoring: props.alert_gameScoring,
        }
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    onSelectItem = (field, value) => {
        this._Mounted && this.setState({ [field]: value });
    }

    render() {
        const { onNext, onBack, disabled } = this.props;
        const { allowAlerts, alert_gameStart, alert_gameEnd, alert_gameScoring } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Manage Alert</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <ItemComponent
                        title="Allow Alerts"
                        isToggle
                        value={allowAlerts}
                        onPress={() => this.onSelectItem('allowAlerts', !allowAlerts)} />
                    <View style={{ marginTop: 10 }}>
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
                </View>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        disabled={disabled}
                        onPress={onBack}
                        activeOpacity={0.7}
                        style={[styles.buttonStyle, styles.buttonBack]}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={disabled}
                        onPress={() => onNext({
                            allowAlerts,
                            alert_gameStart,
                            alert_gameEnd,
                            alert_gameScoring
                        })}
                        activeOpacity={0.7}
                        style={[styles.buttonStyle, styles.buttonNext]}>
                        <Text style={styles.buttonText}>Add Card</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    titleText: {
        fontSize: 16,
    },
    radioContainer: {
        borderColor: '#222',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center'
    },
    teamLogoImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        flex: 1
    },
    selectItemTeamName: {
        flex: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectItemOverUnder: {
        marginLeft: 16
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
        fontSize: 14,
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