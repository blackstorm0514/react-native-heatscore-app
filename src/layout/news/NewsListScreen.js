import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    BackHandler,
    FlatList
} from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import { ImageOverlay } from '../../components/image-overlay.component';
import { PlusOutlineIcon } from '../../libs/icons';
import { getNews } from '../../redux/services';
import { LoadingIndicator } from '../scores/components/LoadingIndicator';

export default class NewsListScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            page: 1,
            listNews: [],
            headingNews: null,
            gotAll: false
        }
        this._Mounted = false;
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        this._Mounted = true;
        this.onLoadNews(1);
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this._Mounted = false;
    }

    backAction = () => {
        const { navigation } = this.props;
        navigation.navigate('Scores')
        return true;
    };

    onLoadNews = (page) => {
        const { listNews } = this.state;
        this._Mounted && this.setState({ loading: true, page: page });
        getNews(page)
            .then(({ data }) => {
                const { success, total, data: news, per_page } = data;
                if (success) {
                    if (news.length > 0) {
                        if (page == 1) {
                            const [headingNews, ...listNews] = news;
                            this._Mounted && this.setState({
                                headingNews: headingNews,
                                listNews: listNews,
                                loading: false,
                                total: page * per_page >= total
                            });
                        } else {
                            this._Mounted && this.setState({
                                listNews: [...listNews, ...news],
                                loading: false,
                                total: page * per_page >= total
                            })
                        }
                    }
                } else {
                    this._Mounted && this.setState({ loading: false });
                }
            })
            .catch(error => {
                this._Mounted && this.setState({ loading: false })
            });
    }

    goToItemDetail = (newsItem) => {
        const { navigation } = this.props;
        navigation && navigation.navigate('NewsDetail', { uri: newsItem.url });
    };

    renderHeadingItem = () => {
        const { headingNews } = this.state;
        return (
            <ImageOverlay
                style={styles.headingNewsContainer}
                source={{ uri: headingNews.urlToImage }}>
                <Text style={styles.headingNewsTitle}>
                    {headingNews.title}
                </Text>
                <Text style={styles.headingNewsDescription}>
                    {headingNews.description}
                </Text>
                {headingNews.source && headingNews.source.name && <Text
                    style={styles.headingNewsSource}>
                    {headingNews.source.name}
                </Text>}
                <Button style={styles.readButton}
                    status='control'
                    size='small'
                    onPress={() => this.goToItemDetail(headingNews)}>
                    {() => <Text style={styles.readButtonText}>R E A D</Text>}
                </Button>
            </ImageOverlay>
        )
    };

    renderFooterItem = () => {
        const { loading, gotAll, page } = this.state;
        return (
            loading || gotAll ? null :
                <Button
                    style={styles.loadButton}
                    size='small'
                    accessoryRight={PlusOutlineIcon}
                    onPress={() => this.onLoadNews(page + 1)}>
                    <Text style={styles.loadButtonText}>
                        LOAD MORE
                    </Text>
                </Button>
        )
    }

    renderNewsItem = (info) => (
        <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={() => this.goToItemDetail(info.item)}>
            <View style={styles.itemSection}>
                <Text style={styles.itemTitle}>
                    {info.item.title}
                </Text>
                {info.item.source && info.item.source.name && <Text
                    style={styles.itemSource}>
                    {info.item.source.name}
                </Text>}
            </View>
            <Image
                style={styles.itemImageSection}
                source={{ uri: info.item.urlToImage }}
            />
        </TouchableOpacity>
    );

    render() {
        const { headingNews, listNews, loading } = this.state;
        return (
            <View style={styles.container}>
                {headingNews && <FlatList
                    style={styles.list}
                    data={listNews}
                    renderItem={this.renderNewsItem}
                    ListHeaderComponent={this.renderHeadingItem}
                    ListFooterComponent={this.renderFooterItem}
                    keyExtractor={(item, index) => index.toString()}
                />}
                {loading && <LoadingIndicator style={styles.loadingIndicator} />}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    list: {
        backgroundColor: '#121212'
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
    headingNewsContainer: {
        justifyContent: 'center',
        paddingHorizontal: 15,
        minHeight: 200,
        marginBottom: 4,
    },
    headingNewsTitle: {
        zIndex: 1,
        textAlign: 'center',
        fontSize: 18
    },
    headingNewsDescription: {
        zIndex: 1,
        marginTop: 10,
        fontSize: 14
    },
    headingNewsSource: {
        marginTop: 10,
        fontSize: 12
    },
    item: {
        marginBottom: 4,
        flexDirection: 'row',
        minHeight: 100,
        backgroundColor: '#222',
        marginHorizontal: 2,
        padding: 10,
        borderRadius: 4,
    },
    itemSection: {
        flex: 2,
        padding: 2,
    },
    itemImageSection: {
        flex: 1,
        padding: 0,
    },
    itemTitle: {
        flex: 1,
        fontSize: 14
    },
    itemSource: {
        alignSelf: 'baseline',
        fontSize: 12,
        marginTop: 10,
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
});
