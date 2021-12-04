import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import InputSpinner from "react-native-input-spinner";
import ModalAction from "./ModalAction";

export default class SelectPointComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            points: props.points ? props.points : 0,
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
        const { points } = this.state;
        const { onNext, onBack } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Input Points</Text>
                </View>
                <View style={styles.inputContainer}>
                    <InputSpinner
                        style={styles.spinner}
                        min={null}
                        value={points}
                        step={0.5}
                        precision={1}
                        type='real'
                        rounded={false}
                        showBorder={true}
                        editable={true}
                        textColor="#FFF"
                        fontSize={16}
                        selectionColor="#999"
                        inputStyle={{ borderColor: 'white' }}
                        buttonStyle={{ backgroundColor: 'black', borderColor: '#FFF', borderWidth: 1 }}
                        onChange={(value) => this._Mounted && this.setState({ points: value })}
                    />
                </View>

                <ModalAction
                    onBack={onBack}
                    onNext={() => onNext(points)} />
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
    inputContainer: {
        borderColor: '#222',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center'
    },
})