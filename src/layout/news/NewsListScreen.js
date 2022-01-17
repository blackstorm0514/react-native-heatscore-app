import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    BackHandler,
    FlatList,
    Dimensions
} from 'react-native';
import { Button, Text, Input } from '@ui-kitten/components';
import { PlusOutlineIcon } from '../../libs/icons';
import { getNews } from '../../redux/services';
import { LoadingIndicator } from '../scores/components/LoadingIndicator';
import ScaledImage from '../../components/ScaledImage';
import { CloseIcon, SearchIcon } from '../../libs/icons';
import format from 'date-fns/format';

const screenWidth = Dimensions.get('window').width;
const NewsListScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [listNews, setListNews] = useState([]);
    const [search, setSearch] = useState('');
    const [gotAll, setGotAll] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        onLoadNews(page);
        return () => {
            backHandler.remove();
        }
    }, [page])

    const backAction = () => {
        const { navigation } = props;
        navigation.navigate('Scores')
        return true;
    };

    const onLoadNews = (page) => {
        if (loading) return;
        setLoading(true);
        getNews(page, search)
            .then(({ data }) => {
                const { success, total, data: news, per_page } = data;
                if (success) {
                    if (news.length > 0) {
                        if (page == 1) {
                            setListNews(news);
                            setLoading(false);
                            if (total == news.length) {
                                setGotAll(true);
                            } else {
                                setGotAll(false);
                            }
                        } else {
                            const newListNews = [...listNews, ...news];
                            setListNews(newListNews);
                            setLoading(false);
                            if (total == newListNews.length) {
                                setGotAll(true)
                            } else {
                                setGotAll(false);
                            }
                        }
                    }
                } else {
                    setLoading(false);
                }
            })
            .catch(error => {
                setLoading(false);
            });
    }

    const goToItemDetail = (newsItem) => {
        const { navigation } = props;
        navigation && navigation.navigate('NewsDetail', { uri: newsItem.url });
    };

    const renderFooterItem = () => {
        if (loading) {
            return (
                <LoadingIndicator style={styles.loadingIndicator} />
            )
        }
        if (gotAll) return null;

        return (
            <Button
                style={styles.loadButton}
                size='small'
                accessoryRight={PlusOutlineIcon}
                onPress={() => setPage(page + 1)}>
                <Text style={styles.loadButtonText}>
                    LOAD MORE
                </Text>
            </Button>
        )
    }

    const renderNewsItem = (info) => (
        <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={() => goToItemDetail(info.item)}>
            <View style={styles.itemSection}>
                <Text style={styles.itemTitle}>
                    {info.item.title}
                </Text>
            </View>
            <ScaledImage
                uri={info.item.urlToImage}
                width={screenWidth - 28}
            />
            <View style={styles.itemFooter}>
                <Text style={styles.itemPublishedTime}>{formatDate(info.item.publishedAt)}</Text>
                {info.item.source && info.item.source.name && <Text
                    style={styles.itemSource}>
                    {info.item.source.name}
                </Text>}
            </View>
        </TouchableOpacity>
    );

    const formatDate = (date) => {
        return format(new Date(date), "eee, MMM dd yyyy");
    }

    const customSearchIcon = () => {
        return <SearchIcon style={styles.searchIcon} />
    }

    const customClearIcon = () => {
        return search ? <TouchableOpacity activeOpacity={0.8} onPress={() => onChangeSearch('')}>
            <CloseIcon style={styles.searchIcon} />
        </TouchableOpacity> : null
    }

    const onSearch = () => {
        setListNews([]);
        setPage(1);
        onLoadNews(1);
    }

    const onChangeSearch = (search) => {
        if (searchTimeout) clearTimeout(searchTimeout);
        setSearch(search);
        setSearchTimeout(setTimeout(onSearch, 500))
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Input
                    style={styles.searchInput}
                    placeholder='Search ...'
                    placeholderTextColor="#888"
                    value={search}
                    onChangeText={onChangeSearch}
                    accessoryLeft={customSearchIcon}
                    accessoryRight={customClearIcon}
                />
            </View>
            <FlatList
                style={styles.list}
                data={listNews}
                renderItem={renderNewsItem}
                ListFooterComponent={renderFooterItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

export default NewsListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    list: {
        backgroundColor: '#121212',
        flex: 1
    },
    readButton: {
        width: '50%',
        marginVertical: 10,
        alignSelf: 'center',
    },
    readButtonText: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
    },
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
    loadingIndicator: {
        height: 100,
        justifyContent: 'center'
    },
    header: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: '#121212',
        flexDirection: 'row',
        marginBottom: 6,
    },
    searchInput: {
        marginTop: 6,
        backgroundColor: '#000',
        borderWidth: 0,
        borderRadius: 6,
        flex: 1,
        tintColor: '#FFF'
    },
    searchButton: {
        backgroundColor: '#121212',
        borderColor: '#121212',
        color: 'white',
    },
    searchIcon: {
        height: 20,
        width: 20,
        marginHorizontal: 4,
        tintColor: '#FFF'
    },
});
