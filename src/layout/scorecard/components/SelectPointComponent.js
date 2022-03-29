import React, { PureComponent, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import Toast from 'react-native-simple-toast';
import { Slider } from '@miblanchard/react-native-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';


const SelectPointComponent = (props) => {
    const [points, setPoints] = useState(0);
    const { type, onSelect } = props;

    useEffect(() => {
        setPoints(props.points)
    }, []);

    const onSpinPoint = (diff) => {
        if (type == 'spread') {
            if (-30 > points + diff || points + diff > 30) return;
        }
        if (type != 'spread') {
            if (0 > points + diff || points + diff > 250) return;
        }

        onChangePoint(points + diff);
    }

    const onChangePoint = (value) => {
        if (Array.isArray(value)) value = value[0]
        setPoints(value);
        onSelect(value);
    }

    if (!['total', 'spread', 'total_home', 'total_away'].includes(type)) return null;
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{type == 'spread' ? 'Spread' : 'Total Points'}: {points}</Text>
            </View>
            <View style={styles.inputContainer}>
                {/* <Input
                        style={styles.numberInput}
                        value={points.toString()}
                        textAlign="center"
                        keyboardType="numeric"
                        // onChangeText={this.onChangeText}
                        onKeyPress={this.onKeyPress}
                    /> */}
                <TouchableOpacity
                    style={styles.spinButton}
                    onPress={() => onSpinPoint(-0.5)}
                >
                    <Ionicons size={30} color='#B90000' name='remove' />
                </TouchableOpacity>
                <Slider
                    value={points}
                    flex={1}
                    onValueChange={onChangePoint}
                    minimumValue={type == 'spread' ? -30 : 0}
                    maximumValue={type == 'spread' ? 30 : 250}
                    step={0.5}
                    thumbTintColor="#B90000"
                />
                <TouchableOpacity
                    style={styles.spinButton}
                    onPress={() => onSpinPoint(+0.5)}
                >
                    <Ionicons size={30} color='#B90000' name='add' />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default SelectPointComponent

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
        // paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // marginLeft: 10,
        // marginRight: 10,
        justifyContent: 'space-between',
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
    spinButton: {
        paddingHorizontal: 7
    }
})