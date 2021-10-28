import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import {
    Input,
    Layout,
    List,
    StyleService,
    useStyleSheet,
} from '@ui-kitten/components';
import { MessageItem } from './extra/message-item.component';
import { SearchIcon } from './extra/icons';
import { Message } from './extra/data';

const initialMessages = [
    Message.howAreYou(),
    Message.canYouSend(),
    Message.noProblem(),
];

export default ({ navigation }) => {
    const styles = useStyleSheet(themedStyles);
    const [searchQuery, setSearchQuery] = React.useState();

    const onItemPress = () => {
        navigation && navigation.navigate('Chat1');
    };

    const renderItem = (info) => (
        <MessageItem
            style={styles.item}
            message={info.item}
            onPress={onItemPress}
        />
    );

    const renderHeader = () => (
        <Layout style={styles.header} level='1'>
            <Input
                placeholder='Search'
                value={searchQuery}
                accessoryRight={SearchIcon}
            />
        </Layout>
    );

    return (
        <List
            style={styles.list}
            data={initialMessages}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
        />
    );
};

const themedStyles = StyleService.create({
    list: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    item: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'background-basic-color-3',
    },
});
