import React, { PureComponent } from "react";
import { StyleSheet, View, TouchableOpacity, } from 'react-native';
import { Text } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class SelectTypeComponent extends PureComponent {
    render() {
        const { type, onSelect } = this.props;;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>TYPE</Text>
                </View>
                <View style={styles.typeContainer}>
                    <TouchableOpacity style={styles.radioContainer}
                        activeOpacity={0.7}
                        onPress={() => onSelect('moneyline')}>
                        <FontAwesomeIcon color='white' size={14}
                            name={type == 'moneyline' ? 'check-circle' : 'circle-thin'} />

                        <Text style={styles.selectItemType} numberOfLines={1}>Moneyline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.radioContainer}
                        activeOpacity={0.7}
                        onPress={() => onSelect('spread')}>
                        <FontAwesomeIcon color='white' size={14}
                            name={type == 'spread' ? 'check-circle' : 'circle-thin'} />
                        <Text style={styles.selectItemType} numberOfLines={1}>Spread</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.radioContainer}
                        activeOpacity={0.7}
                        onPress={() => onSelect('total')}>
                        <FontAwesomeIcon color='white' size={14}
                            name={type == 'total' ? 'check-circle' : 'circle-thin'} />
                        <Text style={styles.selectItemType} numberOfLines={1}>Total Over / Under</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.typeContainer}>
                    <TouchableOpacity style={styles.radioContainer}
                        activeOpacity={0.7}
                        onPress={() => onSelect('total_home')}>
                        <FontAwesomeIcon color='white' size={14}
                            name={['total_home', 'total_away'].includes(type) ? 'check-circle' : 'circle-thin'} />
                        <Text style={styles.selectItemType} numberOfLines={1}>Team Over / Under</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingVertical: 6,
        borderBottomColor: '#222',
        borderBottomWidth: 1,
    },
    titleContainer: {
        flexDirection: 'row',
    },
    titleText: {
        fontSize: 14,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    selectItemType: {
        fontSize: 14,
        marginLeft: 5
    },
    typeContainer: {
        flexDirection: 'row',
        marginTop: 6,
    }
})