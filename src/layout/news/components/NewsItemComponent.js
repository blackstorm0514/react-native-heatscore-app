import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { Text } from '@ui-kitten/components';
import ScaledImage from '../../../components/ScaledImage';
import format from 'date-fns/format';

const screenWidth = Dimensions.get('window').width;
export default class NewsItemComponent extends PureComponent {
    goToItemDetail = (newsItem) => {
        const { navigation } = this.props;
        navigation && navigation.navigate('NewsDetail', { uri: newsItem.url });
    };

    formatDate = (date) => {
        return format(new Date(date), "eee, MMM dd yyyy");
    }

    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity
                style={styles.item}
                activeOpacity={0.8}
                onPress={() => this.goToItemDetail(item)}>
                <View style={styles.itemSection}>
                    <Text style={styles.itemTitle}>
                        {item.title}
                    </Text>
                </View>
                <ScaledImage
                    uri={item.urlToImage}
                    width={screenWidth - 28}
                />
                <View style={styles.itemFooter}>
                    <Text style={styles.itemPublishedTime}>{this.formatDate(item.publishedAt)}</Text>
                    {item.source && item.source.name && <Text
                        style={styles.itemSource}>
                        {item.source.name}
                    </Text>}
                </View>
            </TouchableOpacity>
        )
    };
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 4,
        backgroundColor: '#222',
        marginHorizontal: 4,
        padding: 10,
        borderRadius: 4,
    },
    itemImageSection: {
        flex: 1,
        padding: 0,
        width: '100%',
        resizeMode: 'contain',
        height: 'auto'
    },
    itemTitle: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold'
    },
    itemSource: {
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    itemFooter: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    itemPublishedTime: {
        color: '#888',
        fontSize: 12
    },
});
