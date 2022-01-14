import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
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
export default class NewsListScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            page: 1,
            listNews: [],
            gotAll: false,
            search: '',
            searchTimeout: null,
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
        const { listNews, search, loading } = this.state;
        if (loading) return;
        this._Mounted && this.setState({ loading: true, page: page });
        getNews(page, search)
            .then(({ data }) => {
                const { success, total, data: news, per_page } = data;
                if (success) {
                    if (news.length > 0) {
                        if (page == 1) {
                            this._Mounted && this.setState({
                                listNews: news,
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


    renderFooterItem = () => {
        const { loading, gotAll, page } = this.state;
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
            </View>
            <ScaledImage
                uri={info.item.urlToImage}
                width={screenWidth - 28}
            />
            <View style={styles.itemFooter}>
                <Text style={styles.itemPublishedTime}>{this.formatDate(info.item.publishedAt)}</Text>
                {info.item.source && info.item.source.name && <Text
                    style={styles.itemSource}>
                    {info.item.source.name}
                </Text>}
            </View>
        </TouchableOpacity>
    );

    formatDate = (date) => {
        return format(new Date(date), "eee, MMM dd yyyy");
    }

    customSearchIcon = () => {
        return <SearchIcon style={styles.searchIcon} />
    }

    customClearIcon = () => {
        const { search } = this.state;
        return search ? <TouchableOpacity activeOpacity={0.8} onPress={() => this.onChangeSearch('')}>
            <CloseIcon style={styles.searchIcon} />
        </TouchableOpacity> : null
    }

    onSearch = async () => {
        await this.setState({ listNews: [] });
        this.onLoadNews(1);
    }

    onChangeSearch = (search) => {
        const { searchTimeout } = this.state;
        if (searchTimeout) clearTimeout(searchTimeout);
        this._Mounted && this.setState({ search, searchTimeout: setTimeout(this.onSearch, 500) })
    }

    render() {
        const { listNews, search } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Input
                        style={styles.searchInput}
                        placeholder='Search ...'
                        placeholderTextColor="#888"
                        value={search}
                        onChangeText={this.onChangeSearch}
                        accessoryLeft={this.customSearchIcon}
                        accessoryRight={this.customClearIcon}
                    />
                </View>
                <FlatList
                    style={styles.list}
                    data={listNews}
                    renderItem={this.renderNewsItem}
                    ListFooterComponent={this.renderFooterItem}
                    keyExtractor={(item, index) => index.toString()}
                />
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
