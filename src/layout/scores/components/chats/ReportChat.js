import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import { Text } from '@ui-kitten/components';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class ReportChat extends PureComponent {
    render() {
        const { chatReport, onCloseReport } = this.props;
        return chatReport && (
            <View style={styles.container}>
                <View style={styles.headerCotnainer}>
                    <View style={styles.headerCotnainer}>
                        <FeatherIcon
                            size={20}
                            color='#FFF'
                            name='user'
                        />
                        <Text style={styles.headerText}>{chatReport.user.username}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8}
                        style={styles.closeIcon}
                        onPress={onCloseReport}>
                        <FontAwesomeIcon
                            size={20}
                            color='#FFF'
                            name='close'
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.inLineButtons}>
                    <TouchableOpacity activeOpacity={0.8}
                        style={styles.pressItem}>
                        <Text style={styles.pressItemText}>Like!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}
                        style={styles.pressItem}>
                        <Text style={styles.pressItemText}>Reply</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inLineButtons}>
                    <TouchableOpacity activeOpacity={0.8}
                        style={styles.pressItem}>
                        <Text style={styles.pressItemText}>Report Abuse</Text>
                    </TouchableOpacity>
                    {chatReport.text && <TouchableOpacity activeOpacity={0.8}
                        style={styles.pressItem}>
                        <Text style={styles.pressItemText}>Translate to English</Text>
                    </TouchableOpacity>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#111',
        paddingVertical: 20,
    },
    headerCotnainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        paddingBottom: 5
    },
    headerText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 6,
        fontWeight: 'bold'
    },
    closeIcon: {
        alignSelf: 'auto'
    },
    pressItem: {
        paddingHorizontal: 20,
        paddingTop: 10,
        flex: 1
    },
    pressItemText: {
        fontSize: 14,
        color: '#aaa'
    },
    inLineButtons: {
        flexDirection: 'row'
    }
})