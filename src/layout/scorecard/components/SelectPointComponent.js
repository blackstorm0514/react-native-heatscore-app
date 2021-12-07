import React, { PureComponent } from "react";
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import InputSpinner from "react-native-input-spinner";

export default class SelectPointComponent extends PureComponent {
    render() {
        const { points, onSelect, type } = this.props;
        if (!['total', 'spread'].includes(type)) return null;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{type == 'spread' ? 'Spread' : 'Total Points'}</Text>
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
                        fontSize={14}
                        height={30}
                        selectionColor="#999"
                        inputStyle={{ borderColor: 'white', paddingVertical: 4 }}
                        buttonStyle={{ backgroundColor: 'black', borderColor: '#FFF', borderWidth: 1 }}
                        onChange={(value) => onSelect(value)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        paddingVertical: 4,
    },
    titleText: {
        fontSize: 14,
    },
    inputContainer: {
        borderColor: '#222',
        borderBottomWidth: 1,
        paddingVertical: 6,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
})