import React, { PureComponent } from "react";
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';

export default class ModalAction extends PureComponent {
    render() {
        const { onBack, onNext } = this.props;

        return (
            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    onPress={onBack}
                    activeOpacity={0.7}
                    style={[styles.buttonStyle, styles.buttonBack]}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onNext}
                    activeOpacity={0.7}
                    style={[styles.buttonStyle, styles.buttonNext]}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    actionsContainer: {
        flexDirection: 'row',
        marginTop: 10,
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