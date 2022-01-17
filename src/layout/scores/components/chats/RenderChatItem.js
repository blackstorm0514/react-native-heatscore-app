import React, { useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Text } from '@ui-kitten/components';
import { format } from 'date-fns';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ScaledImage from '../../../../components/ScaledImage';

const screenWidth = Dimensions.get('window').width;

const RenderChatReply = ({ chatReply }) => {

    const { user, createdAt, text, image } = chatReply;
    const time_str = format(new Date(createdAt.seconds * 1000), "MMM d, hh:mm aaa");
    return (
        <View style={styles.replyContainer}>
            {image && <>
                <ScaledImage
                    uri={image}
                    width={parseInt(screenWidth / 3)}
                />
            </>}
            {text && <Text style={{ color: '#ddd', fontWeight: '100', fontSize: 12, fontStyle: 'italic' }}>{text}</Text>}
            <Text style={styles.replyChatName}>{user.username}  <Text style={styles.replyChatTime}>{time_str}</Text> </Text>
        </View>
    )
}

const RenderChatItem = (props) => {
    const scrollRef = useRef(null);

    const onScroll = ({ nativeEvent: { layoutMeasurement, contentOffset, contentSize } }) => {
        const { chat, onSelectReply } = props;
        const { user, createdAt, text, image } = chat;
        if (layoutMeasurement.width + contentOffset.x + 1 >= contentSize.width) {
            onSelectReply({
                user,
                createdAt,
                text: text ? text : null,
                image: image ? image : null
            });
        }
        scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }

    const { chat, onSelectReport } = props;
    const { user, createdAt, text, image, chatReply } = chat;
    const time_str = format(new Date(createdAt.seconds * 1000), "MMM d, hh:mm aaa");
    return (
        <ScrollView horizontal
            ref={scrollRef}
            onScrollEndDrag={onScroll}
            showsHorizontalScrollIndicator={false}
        >
            <TouchableOpacity style={styles.chatItemContainer}
                onPress={() => onSelectReport(chat)}
                activeOpacity={0.8}>
                <FeatherIcon
                    size={20}
                    color='#ddd'
                    name='user'
                />
                <View style={styles.chatContentContainer}>
                    {chatReply && <RenderChatReply chatReply={chatReply} />}
                    <Text style={styles.chatTime}>{time_str}</Text>
                    {image && <>
                        <Text style={styles.chatContent}>{user.username}</Text>
                        <ScaledImage
                            uri={image}
                            width={parseInt(screenWidth / 2)}
                        />
                    </>}
                    {text && <Text style={styles.chatContent}>{user.username}: <Text style={{ color: 'white', fontWeight: '100', fontSize: 13 }}>{text}</Text></Text>}
                </View>
            </TouchableOpacity>
            <View style={styles.replyButtonContainer}>
                <View style={styles.replyButtonWrapper}>
                    <FontAwesomeIcon size={16}
                        name='reply'
                        color="#FFF" />
                </View>
            </View>
        </ScrollView>
    );
}

export default RenderChatItem;

const styles = StyleSheet.create({
    chatItemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderBottomColor: '#222',
        borderBottomWidth: 1,
        paddingVertical: 6,
        width: screenWidth
    },
    chatContentContainer: {
        marginHorizontal: 10,
        width: '100%'
    },
    chatTime: {
        color: '#888',
        fontSize: 10,
    },
    chatContent: {
        fontSize: 11,
        marginTop: 2,
        color: 'orange',
        fontWeight: 'bold'
    },
    replyButtonContainer: {
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    replyButtonWrapper: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 20
    },
    replyContainer: {
        backgroundColor: '#222',
        borderLeftColor: '#000',
        borderLeftWidth: 5,
        paddingHorizontal: 10,
        paddingVertical: 4,
        width: '90%',
        borderRadius: 4,
        marginBottom: 4
    },
    replyChatName: {
        fontSize: 10,
        marginTop: 2,
        color: 'orange',
        fontWeight: 'bold'
    },
    replyChatTime: {
        color: '#888',
        fontSize: 9,
    }
});
