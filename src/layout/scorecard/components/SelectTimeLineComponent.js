import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class SelectTimeLineComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
        }
    }

    onSelectTimeLine = (type) => {
        this.setState({ selected: type });
    }

    render() {
        const { selected } = this.state;
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
                    <Text style={styles.titleText}>Select a type</Text>
                    <Text></Text>
                </View>
                <TouchableOpacity style={styles.radioContainer}
                    activeOpacity={0.7}
                    onPress={() => this.onSelectTimeLine('Game')}>
                    <FontAwesomeIcon color='white' size={20}
                        name={selected == 'Game' ? 'check-circle' : 'circle-thin'} />

                    <Text style={styles.selectItemType} numberOfLines={1}>Game</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioContainer}
                    activeOpacity={0.7}
                    onPress={() => this.onSelectTimeLine('1st_half')}>
                    <FontAwesomeIcon color='white' size={20}
                        name={selected == '1st_half' ? 'check-circle' : 'circle-thin'} />
                    <Text style={styles.selectItemType} numberOfLines={1}>1st Half</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioContainer}
                    activeOpacity={0.7}
                    onPress={() => this.onSelectTimeLine('2nd_half')}>
                    <FontAwesomeIcon color='white' size={20}
                        name={selected == '2nd_half' ? 'check-circle' : 'circle-thin'} />
                    <Text style={styles.selectItemType} numberOfLines={1}>2nd Half</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioContainer}
                    activeOpacity={0.7}
                    onPress={() => this.onSelectTimeLine('1st_quarter')}>
                    <FontAwesomeIcon color='white' size={20}
                        name={selected == '1st_quarter' ? 'check-circle' : 'circle-thin'} />
                    <Text style={styles.selectItemType} numberOfLines={1}>1st Quarter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioContainer}
                    activeOpacity={0.7}
                    onPress={() => this.onSelectTimeLine('2nd_quarter')}>
                    <FontAwesomeIcon color='white' size={20}
                        name={selected == '2nd_quarter' ? 'check-circle' : 'circle-thin'} />
                    <Text style={styles.selectItemType} numberOfLines={1}>2nd Quarter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioContainer}
                    activeOpacity={0.7}
                    onPress={() => this.onSelectTimeLine('3rd_quarter')}>
                    <FontAwesomeIcon color='white' size={20}
                        name={selected == '3rd_quarter' ? 'check-circle' : 'circle-thin'} />
                    <Text style={styles.selectItemType} numberOfLines={1}>3rd Quarter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioContainer}
                    activeOpacity={0.7}
                    onPress={() => this.onSelectTimeLine('4th_quarter')}>
                    <FontAwesomeIcon color='white' size={20}
                        name={selected == '4th_quarter' ? 'check-circle' : 'circle-thin'} />
                    <Text style={styles.selectItemType} numberOfLines={1}>4th Quarter</Text>
                </TouchableOpacity>
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