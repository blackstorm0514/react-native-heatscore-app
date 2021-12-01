import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class SelectTypeComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type ? props.type : null
        }
    }

    onBack = () => {
        const { onBack, onSelect } = this.props;
        const { type } = this.state;
        onSelect(type);
        onBack();
    }

    render() {
        const { type } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={this.onBack}>
                        <FontAwesomeIcon
                            color='#fff'
                            size={24} name='angle-left' />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Select a type</Text>
                    <Text></Text>
                </View>
                <TouchableOpacity style={styles.radioContainer}
                    activeOpacity={0.7}
                    onPress={() => this.setState({ type: 'moneyline' })}>
                    <FontAwesomeIcon color='white' size={20}
                        name={type == 'moneyline' ? 'check-circle' : 'circle-thin'} />

                    <Text style={styles.selectItemType} numberOfLines={1}>Moneyline</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioContainer}
                    activeOpacity={0.7}
                    onPress={() => this.setState({ type: 'spread' })}>
                    <FontAwesomeIcon color='white' size={20}
                        name={type == 'spread' ? 'check-circle' : 'circle-thin'} />
                    <Text style={styles.selectItemType} numberOfLines={1}>Spread</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioContainer}
                    activeOpacity={0.7}
                    onPress={() => this.setState({ type: 'total' })}>
                    <FontAwesomeIcon color='white' size={20}
                        name={type == 'total' ? 'check-circle' : 'circle-thin'} />
                    <Text style={styles.selectItemType} numberOfLines={1}>Total</Text>
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
        fontSize: 16,
    },
    radioContainer: {
        borderColor: '#222',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingVertical: 16,
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