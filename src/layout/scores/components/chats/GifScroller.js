import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { List, Button } from '@ui-kitten/components'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { LoadingIndicator } from '../LoadingIndicator';

const GIPHY_API_KEY = "7X7ECHNRQ3AC";
const GIPHY_LIMIT = 10;

export default class GifScroller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gifs: [],
            offset: 0,
            loading: false,
            selectedImage: null
        }
        this._Mounted = false;
    }

    componentDidMount = () => {
        this._Mounted = true;
        if (this.props.inputText === '') {
            this.buildUrl('trending');
        } else {
            const searchTerm = this.props.inputText;
            this.buildUrl('search', searchTerm, GIPHY_LIMIT);
        }
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this._Mounted && this.setState({ gifs: [], offset: 0 });
        if (nextProps.inputText === '') {
            this.buildUrl('trending');
        } else {
            const searchTerm = nextProps.inputText;
            this.buildUrl('search', searchTerm, GIPHY_LIMIT)
        }
    }

    handleGifSelect = (url) => {
        if (this.props.handleGifSelect) {
            this.props.handleGifSelect(url);
        }
    }

    loadMoreImages = () => {
        const { offset } = this.state;
        const { inputText } = this.props;
        this.buildUrl('search', inputText, GIPHY_LIMIT, offset, true);
    }

    buildUrl = (endpoint, q, limit, pos, loadmore = false) => {
        if (endpoint === 'trending') {
            let endpoint = 'https://g.tenor.com/v1/trending'
            let query = { key: GIPHY_API_KEY, media_filter: 'minimal', limit };
            this.fetchAndRenderGifs(endpoint, query, loadmore);
        }
        else {
            let endpoint = 'https://g.tenor.com/v1/search';
            let query = { q, key: GIPHY_API_KEY, media_filter: 'minimal', limit, pos };
            this.fetchAndRenderGifs(endpoint, query, loadmore);
        }
    }

    fetchAndRenderGifs = async (url, query, newly = false) => {
        const { offset, gifs } = this.state;
        this._Mounted && this.setState({ loading: true });
        await axios.get(url, { params: query })
            .then(({ data }) => {
                const { results } = data;
                const gifsUrls = results.map((result) => {
                    return result.media[0].gif.url
                });
                if (newly) {
                    this._Mounted && this.setState({
                        gifs: [...gifs, ...gifsUrls],
                        offset: offset + GIPHY_LIMIT,
                        loading: false,
                    });
                } else {
                    this._Mounted && this.setState({
                        gifs: gifsUrls,
                        offset: 0,
                        loading: false
                    });
                }
            })
            .catch((error) => {
                this._Mounted && this.setState({ loading: false });
            })
    };

    renderItem = ({ item }) => {
        const { loading } = this.state;
        if (item == 'loadmore') {
            if (loading) {
                return (
                    <LoadingIndicator style={styles.lastComponent} />
                )
            }
            else {
                return (
                    <TouchableOpacity onPress={() => this.loadMoreImages()} style={styles.lastComponent}>
                        <AntDesignIcon name="pluscircle" size={32} color="#ddd" />
                    </TouchableOpacity>
                )
            }
        }
        return (
            <TouchableOpacity onPress={() => this._Mounted && this.setState({ selectedImage: item })}>
                <ImageBackground
                    style={styles.postItem}
                    source={{ uri: item }}
                />
            </TouchableOpacity>
        )
    }

    render() {
        const { gifs, selectedImage } = this.state;
        return (
            <View style={styles.scroll}>
                <List
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this.renderItem}
                    data={[...gifs, 'loadmore']}
                    style={styles.list}
                />
                {selectedImage && <View style={styles.previewPanel}>
                    <ImageBackground source={{ uri: selectedImage }}
                        style={styles.selectedImage} />
                    <Button style={styles.sendButton}
                        onPress={() => this.handleGifSelect(selectedImage)}
                        size='medium'>S E N D</Button>
                </View>}
            </View>
        );
    }
}

GifScroller.defaultProps = {
    inputText: ''
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: '#222',
        paddingVertical: 5,
        minHeight: 110
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 2,
        marginRight: 1,
        resizeMode: 'cover'
    },
    postItem: {
        width: 100,
        height: 100,
        borderRadius: 4,
        marginHorizontal: 8,
        overflow: 'hidden',
    },
    lastComponent: {
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedImage: {
        height: 180,
        maxWidth: '100%',
        minWidth: 180,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    previewPanel: {
        backgroundColor: '#222',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    sendButton: {
        backgroundColor: '#111',
        borderColor: '#111',
        color: 'white',
        marginTop: 10
    }
});
