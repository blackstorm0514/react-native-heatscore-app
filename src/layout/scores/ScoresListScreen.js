import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import { Button, List, Text, Spinner } from '@ui-kitten/components';
import { ImageOverlay } from '../../components/image-overlay.component';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import { ApiService } from '../../services/api.service';
import { PlusOutlineIcon } from '../../components/icons';
import OverlayImage from '../../assets/images/image-splash.png';

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size='small' status='basic' />
    </View>
);

export default ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [listNews, setListNews] = useState([]);
    const [headingNews, setHeadingNews] = useState(null);
    const [gotAll, setGotAll] = useState(false);

    const onLoadNews = (page) => {
        setPage(page);
        setLoading(true);
        ApiService.get('/news', { params: { page } })
            .then(({ data }) => {
                const { success, total, data: news, per_page } = data;
                if (success) {
                    if (news.length > 0) {
                        if (page == 1) {
                            const [headingNews, ...listNews] = news;
                            setHeadingNews(headingNews);
                            setListNews(listNews);
                        } else {
                            setListNews([...listNews, ...news]);
                        }
                        if (page * per_page >= total) {
                            setGotAll(true);
                        }
                    }
                }
                setLoading(false);
            })
            .catch(error => {
                console.log("Getting News Error: ", JSON.stringify(error));
                setLoading(false);
            });
    }

    useEffect(() => {
        onLoadNews(1);
    }, [navigation])

    const onItemPress = (newsItem) => {
        navigation && navigation.navigate('NewsDetail', { uri: newsItem.url });
    };

    const renderHeadingItem = () => (
        <ImageOverlay
            style={styles.headingNewsContainer}
            source={{ uri: headingNews.urlToImage }}>
            <Text
                style={styles.headingNewsTitle}
                status='control'
                category='h3'>
                {headingNews.title}
            </Text>
            <Text
                style={styles.headingNewsDescription}
                category='h6'
                status='control'>
                {headingNews.description}
            </Text>
            {headingNews.source && headingNews.source.name && <Text
                style={styles.headingNewsSource}
                category='h6'
                status='control'>
                {headingNews.source.name}
            </Text>}
            <Button
                style={styles.readButton}
                status='control'
                onPress={() => onItemPress(headingNews)}>
                READ
            </Button>
        </ImageOverlay>
    );

    const renderFooterItem = () => (
        loading || gotAll ? null :
            <Button
                style={styles.loadButton}
                accessoryRight={PlusOutlineIcon}
                onPress={() => onLoadNews(page + 1)}>
                <Text style={styles.loadButtonText}>
                    LOAD MORE
                </Text>
            </Button>
    )

    const renderNewsItem = (info) => (
        <TouchableOpacity
            style={styles.item}
            activeOpacity={0.95}
            onPress={() => onItemPress(info.item)}>
            <View style={styles.itemSection}>
                <Text
                    style={styles.itemTitle}
                    category='s1'>
                    {info.item.title}
                </Text>
                {info.item.source && info.item.source.name && <Text
                    style={styles.itemSource}
                    category='h6'>
                    {info.item.source.name}
                </Text>}
            </View>
            <Image
                style={styles.itemImageSection}
                source={{ uri: info.item.urlToImage }}
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {headingNews && <List
                style={styles.list}
                data={listNews}
                renderItem={renderNewsItem}
                ListHeaderComponent={renderHeadingItem}
                ListFooterComponent={renderFooterItem}
            />}
            {!headingNews && <ImageOverlay
                style={styles.container}
                source={OverlayImage}>
            </ImageOverlay>}
            {loading && <OrientationLoadingOverlay
                visible={true}
                color="white"
                indicatorSize="large"
                messageFontSize={24}
                message="Loading..."
            />}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    list: {
        // flex: 1,
        backgroundColor: 'black'
    },
    readButton: {
        width: '50%',
        marginTop: 30,
        alignSelf: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    headingNewsContainer: {
        justifyContent: 'center',
        paddingHorizontal: 15,
        minHeight: 320,
        marginBottom: 4,
    },
    headingNewsTitle: {
        zIndex: 1,
        textAlign: 'center',
    },
    headingNewsDescription: {
        zIndex: 1,
        marginTop: 20,
    },
    headingNewsSource: {
        marginTop: 15,
    },
    item: {
        // borderWidth: 2,
        // borderColor: '#DDD',
        marginBottom: 6,
        flexDirection: 'row',
        height: 150,
        backgroundColor: '#05162b',
        marginHorizontal: 6,
        padding: 10,
        borderRadius: 4,
        shadowColor: '#25364b',
        shadowRadius: 2,
    },
    itemSection: {
        flex: 2,
        padding: 6,
    },
    itemImageSection: {
        flex: 1,
        padding: 0,
    },
    itemReactionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
        marginHorizontal: -8,
    },
    itemTitle: {
        flex: 1,
    },
    itemSource: {
        alignSelf: 'baseline'
    },
    iconButton: {
        paddingHorizontal: 0,
    },
    loadButton: {
        width: '50%',
        marginVertical: 10,
        alignSelf: 'center',
        backgroundColor: '#0A74EF',
        borderColor: '#0A74EF',
    },
    loadButtonText: {
        color: 'white',
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
});
