import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import InputSpinner from "react-native-input-spinner";

export default class SelectPointComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            points: 0,
        }
    }

    render() {
        const { onBack } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={onBack}>
                        <FontAwesomeIcon
                            color='#fff'
                            size={24} name='angle-left' />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Input Points</Text>
                    <Text></Text>
                </View>
                <View style={styles.inputContainer}>
                    <InputSpinner
                        style={styles.spinner}
                        min={null}
                        value={0}
                        step={0.5}
                        precision={1}
                        type='real'
                        rounded={false}
                        showBorder={true}
                        editable={true}
                        textColor="#FFF"
                        fontSize={20}
                        selectionColor="#999"
                        inputStyle={{ borderColor: 'white' }}
                        buttonStyle={{ backgroundColor: 'black', borderColor: '#FFF', borderWidth: 1 }}
                        onChange={(value) => this.setState({ points: value })}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    titleText: {
        fontSize: 20,
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