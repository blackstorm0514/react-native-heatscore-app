import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const TIMELINES_PER_SPORTS = {
    "Soccer": [
        [
            { name: 'Full Game', value: 'game' }
        ],
        [
            { name: '1H', value: '1st_half' },
            { name: '2H', value: '2nd_half' },
        ]
    ],
    "American Football": [
        [
            { name: 'Full Game', value: 'game' }
        ],
        [
            { name: '1H', value: '1st_half' },
            { name: '2H', value: '2nd_half' }
        ],
        [
            { name: 'Q1', value: '1st_quarter' },
            { name: 'Q2', value: '2nd_quarter' },
            { name: 'Q3', value: '3rd_quarter' },
            { name: 'Q4', value: '4th_quarter' }
        ],
    ],
    "Basketball": [
        [
            { name: 'Full Game', value: 'game' }
        ],
        [
            { name: '1H', value: '1st_half' },
            { name: '2H', value: '2nd_half' }
        ],
        [
            { name: 'Q1', value: '1st_quarter' },
            { name: 'Q2', value: '2nd_quarter' },
            { name: 'Q3', value: '3rd_quarter' },
            { name: 'Q4', value: '4th_quarter' }
        ],
    ],
    "Ice Hockey": [
        [
            { name: 'Full Game', value: 'game' }
        ],
        [
            { name: 'P1', value: '1st_peorid' },
            { name: 'P2', value: '2nd_peorid' },
            { name: 'P3', value: '3rd_peorid' }
        ],
    ],
    "Baseball": [
        [
            { name: 'Full Game', value: 'game' }
        ],
        [
            { name: 'I5', value: '5th_innings' }
        ],
    ],
}

export default class SelectTimeLineComponent extends PureComponent {

    render() {
        const { event, timeline, onSelect } = this.props;
        if (!event) return null;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>TIME</Text>
                </View>
                {TIMELINES_PER_SPORTS[event.sport.name] && TIMELINES_PER_SPORTS[event.sport.name].map((peorids, index) => (
                    <View style={styles.timelineContainer} key={index}>
                        {peorids && peorids.map(peorid => (
                            <TouchableOpacity key={peorid.value}
                                style={styles.radioContainer}
                                activeOpacity={0.7}
                                onPress={() => onSelect(peorid.value)}>
                                <FontAwesomeIcon color='white' size={14}
                                    name={timeline == peorid.value ? 'check-circle' : 'circle-thin'} />
                                <Text style={styles.selectItemType} numberOfLines={1}>{peorid.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
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
    timelineContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    selectItemType: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5
    },
})