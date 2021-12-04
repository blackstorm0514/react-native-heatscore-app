import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ModalAction from "./ModalAction";

const TIMELINES_PER_SPORTS = {
    "Soccer": [
        { name: 'Game', value: 'game' },
        { name: '1st Half', value: '1st_half' },
        { name: '2nd Half', value: '2nd_half' },
    ],
    "American Football": [
        { name: 'Game', value: 'game' },
        { name: '1st Half', value: '1st_half' },
        { name: '2nd Half', value: '2nd_half' },
        { name: '1st Quarter', value: '1st_quarter' },
        { name: '2nd Quarter', value: '2nd_quarter' },
        { name: '3rd Quarter', value: '3rd_quarter' },
        { name: '4th Quarter', value: '4th_quarter' },
    ],
    "Basketball": [
        { name: 'Game', value: 'game' },
        { name: '1st Half', value: '1st_half' },
        { name: '2nd Half', value: '2nd_half' },
        { name: '1st Quarter', value: '1st_quarter' },
        { name: '2nd Quarter', value: '2nd_quarter' },
        { name: '3rd Quarter', value: '3rd_quarter' },
        { name: '4th Quarter', value: '4th_quarter' },
    ],
    "Ice Hockey": [
        { name: 'Game', value: 'game' },
        { name: '1st Peorid', value: '1st_peorid' },
        { name: '2nd Peorid', value: '2nd_peorid' },
        { name: '3rd Peorid', value: '3rd_peorid' },
    ],
    "Baseball": [
        { name: 'Game', value: 'game' },
        { name: '5th Innings', value: '5th_innings' },
    ],
}

export default class SelectTimeLineComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            timeline: props.timeline ? props.timeline : null
        }
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    render() {
        const { event, onNext, onBack } = this.props;
        const { timeline } = this.state;
        if (!event) return null;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Select a type</Text>
                </View>
                {TIMELINES_PER_SPORTS[event.sport.name].map(peorid => (
                    <TouchableOpacity key={peorid.value}
                        style={styles.radioContainer}
                        activeOpacity={0.7}
                        onPress={() => this._Mounted && this.setState({ 'timeline': peorid.value })}>
                        <FontAwesomeIcon color='white' size={20}
                            name={timeline == peorid.value ? 'check-circle' : 'circle-thin'} />
                        <Text style={styles.selectItemType} numberOfLines={1}>{peorid.name}</Text>
                    </TouchableOpacity>
                ))}

                <ModalAction
                    onNext={() => onNext(timeline)}
                    onBack={onBack} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center'
    },
    selectItemType: {
        flex: 5,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20
    },
})