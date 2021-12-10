import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { Button, TopNavigation, Text } from '@ui-kitten/components';
import { connect } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import data from './data.json';

class FeedScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        }
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    renderTitle = () => {
        return (
            <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16 }}>
                Activities
            </Text>
        )
    }

    renderFeedItem = ({ item }) => {
        return (
            <View style={styles.feedItemContainer}>
                <FeatherIcon
                    size={16}
                    color='#ddd'
                    name='user'
                />
                <Text style={styles.feedItemUser}>
                    {item.user}
                    {item.type == 'like' && <Text style={styles.feedItemAction}> liked your message</Text>}
                    {item.type == 'reply' && <Text style={styles.feedItemAction}> replied your message: {item.text}</Text>}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container} >
                <TopNavigation title={this.renderTitle} style={styles.headerStyle} />
                <View style={styles.feedContainer}>
                    <Text style={styles.feedHeader}>This Week</Text>
                    <FlatList
                        data={data}
                        style={styles.feedList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderFeedItem}
                    />

                    <Text style={styles.feedHeader}>This Month</Text>
                    <FlatList
                        data={data}
                        style={styles.feedList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderFeedItem}
                    />
                </View>
            </View>
        )
    }
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(FeedScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    headerStyle: {
        backgroundColor: '#121212'
    },
    feedContainer: {
        padding: 10,
    },
    feedHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10
    },
    feedList: {
        marginTop: 5
    },
    feedItemContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4
    },
    feedItemUser: {
        fontSize: 13,
        marginLeft: 5,
        fontWeight: 'bold'
    },
    feedItemAction: {
        fontSize: 13,
    }
});
