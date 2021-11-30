import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
    Dimensions
} from 'react-native';
import { Text } from '@ui-kitten/components';
import { format } from 'date-fns';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import ScaledImage from './ScaledImage';

const win = Dimensions.get('window');

export default class RenderChatItem extends PureComponent {
    render() {
        const { chat } = this.props;
        const { user, createdAt, text, image } = chat;
        const time_str = format(new Date(createdAt.seconds * 1000), "MMM d, hh:mm aaa");
        if (image) {
            return (
                <TouchableOpacity style={styles.chatItemContainer}
                    activeOpacity={0.9}>
                    <FeatherIcon
                        size={30}
                        color='#ddd'
                        name='user'
                    />
                    <View style={styles.chatContentContainer}>
                        <Text style={styles.chatTime}>{time_str}</Text>
                        <Text style={styles.chatContent}>{user.username}</Text>
                        <ScaledImage
                            uri={image}
                            width={win.width - 70}
                        />
                    </View>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity style={styles.chatItemContainer}
                activeOpacity={0.9}>
                <FeatherIcon
                    size={30}
                    color='#ddd'
                    name='user'
                />
                <View style={styles.chatContentContainer}>
                    <Text style={styles.chatTime}>{time_str}</Text>
                    <Text style={styles.chatContent}>{user.username}: <Text style={{ color: 'white', fontWeight: '100' }}>{text}</Text></Text>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    chatItemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderBottomColor: '#222',
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    chatContentContainer: {
        marginHorizontal: 10
    },
    chatTime: {
        color: '#888',
        fontSize: 14,
    },
    chatContent: {
        fontSize: 14,
        marginTop: 6,
        color: 'orange',
        fontWeight: 'bold'
    },
});
