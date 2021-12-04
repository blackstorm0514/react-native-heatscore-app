import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ModalAction from "./ModalAction";

export default class SelectTypeComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type ? props.type : null
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
        const { type } = this.state;
        const { onBack, onNext } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Select a type</Text>
                </View>
                <TouchableOpacity style={styles.radioContainer}
                    activeOpacity={0.7}
                    onPress={() => this._Mounted && this.setState({ type: 'moneyline' })}>
                    <FontAwesomeIcon color='white' size={20}
                        name={type == 'moneyline' ? 'check-circle' : 'circle-thin'} />

                    <Text style={styles.selectItemType} numberOfLines={1}>Moneyline</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioContainer}
                    activeOpacity={0.7}
                    onPress={() => this._Mounted && this.setState({ type: 'spread' })}>
                    <FontAwesomeIcon color='white' size={20}
                        name={type == 'spread' ? 'check-circle' : 'circle-thin'} />
                    <Text style={styles.selectItemType} numberOfLines={1}>Spread</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioContainer}
                    activeOpacity={0.7}
                    onPress={() => this._Mounted && this.setState({ type: 'total' })}>
                    <FontAwesomeIcon color='white' size={20}
                        name={type == 'total' ? 'check-circle' : 'circle-thin'} />
                    <Text style={styles.selectItemType} numberOfLines={1}>Over / Under</Text>
                </TouchableOpacity>

                <ModalAction
                    onNext={() => onNext(type)}
                    onBack={onBack} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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