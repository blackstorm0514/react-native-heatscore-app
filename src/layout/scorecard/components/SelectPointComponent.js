import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import Toast from 'react-native-simple-toast';

export default class SelectPointComponent extends PureComponent {
    onChangeText = (points) => {
        const { onSelect } = this.props;
        const numberPoint = Number(points);
        if (['-', ''].includes(points)) {
            onSelect(points);
        } else {
            if (isNaN(numberPoint)) {
                Toast.show('Please input valid number.');
            } else {
                onSelect(numberPoint);
            }
        }
    }

    onKeyPress = ({ nativeEvent: { key } }) => {
        const { points, onSelect } = this.props;
        switch (key) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                const numberPoints = Number((points ? points : '') + key);
                onSelect(numberPoints.toString());
                break;
            case '+':
                if (points && points.startsWith('-')) {
                    onSelect((-Number(points)).toString());
                }
                break;
            case '-':
                if (points && !points.startsWith('-')) {
                    onSelect('-' + points);
                }
                break;
            case '.':
                if (points != null && points.toString().indexOf('.') == -1) {
                    onSelect(points + '.');
                }
                break;
        }
    }

    render() {
        const { points, type } = this.props;
        if (!['total', 'spread', 'total_home', 'total_away'].includes(type)) return null;
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{type == 'spread' ? 'Spread' : 'Total Points'}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        style={styles.numberInput}
                        value={(points == null ? 0 : points).toString()}
                        textAlign="center"
                        keyboardType="numeric"
                        // onChangeText={this.onChangeText}
                        onKeyPress={this.onKeyPress}
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
    numberInput: {
        backgroundColor: '#040404',
        borderWidth: 0,
        borderRadius: 6,
        flex: 1,
        tintColor: '#FFF',
        fontSize: 14,
    },
    buttonStyle: {
        width: 20,
        alignItems: 'center'
    },
})