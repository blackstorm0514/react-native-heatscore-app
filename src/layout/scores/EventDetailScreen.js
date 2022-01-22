import React, { Component, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { TopNavigationAction, TopNavigation, Text } from '@ui-kitten/components';
import { ArrowIosBackIcon } from '../../libs/icons';
import { TabView, TabBar, TabBarTop } from 'react-native-tab-view';
import RenderEventMatchupComponent from './components/RenderEventMatchupComponent';
import RenderEventChatComponent from './components/RenderEventChatComponent';
import { truncateString } from '../../libs/functions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getEventDetail, toggleFavoriteEvent } from '../../redux/services';
import RenderEventLineupComponent from './components/RenderEventLineupComponent';
import RenderEventHistoryComponent from './components/RenderEventHistoryComponent';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

const screenWidth = Dimensions.get('window').width;
class EventDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            routes: [
                { key: 'chat', title: 'Chat' },
                { key: 'matchup', title: 'MatchUp' },
                { key: 'lineup', title: 'LineUp' },
                { key: 'history', title: 'History' }
            ],
            event: null,
            isFav: false,
            loading: false,
            refreshing: false,
        }
        this._Mounted = false;
    }

    componentDidMount() {
        const { route: { params: { event } }, navigation } = this.props;
        if (!event) {
            navigation.navigate('AllScores');
        }
        this._Mounted = true;
        this.getEventData();
    }

    getEventData = (refreshing = false) => {
        const { route: { params: { event } } } = this.props;
        this._Mounted && this.setState({ [refreshing ? 'refreshing' : 'loading']: true });
        getEventDetail(event.event_id)
            .then(({ data }) => {
                const { success, event, isFav } = data;
                if (success) {
                    this._Mounted && this.setState({ event: event, isFav: isFav, [refreshing ? 'refreshing' : 'loading']: false });
                } else {
                    this._Mounted && this.setState({ event: null, isFav: false, [refreshing ? 'refreshing' : 'loading']: false });
                }
            })
            .catch(() => {
                this._Mounted && this.setState({ event: null, isFav: false, [refreshing ? 'refreshing' : 'loading']: false });
            })
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    goBackAction = () => {
        const { navigation } = this.props;
        return (
            <TopNavigationAction
                icon={ArrowIosBackIcon}
                onPress={() => navigation.goBack()}
            />
        )
    }

    onRefresh = () => {
        this.getEventData(true);
    }

    renderTitle = () => {
        const { route: { params: { event } } } = this.props;
        if (!event) {
            return <Text style={styles.titleText}>Event Not Found</Text>
        }
        const { home, away } = event;
        return <View style={{ paddingTop: 2 }}>
            <Text style={styles.titleText}>{truncateString(home.name)} vs {truncateString(away.name)}</Text>
        </View>
    }

    renderTabBar = (props) => (
        <View style={styles.tabBarContainer}>
            <TabBar
                {...props}
                scrollEnabled
                style={{
                    backgroundColor: '#121212',
                    paddingVertical: 0,
                    justifyContent: 'center',
                }}
                indicatorStyle={{
                    backgroundColor: '#B90000',
                    height: 1,
                    marginVertical: 0,
                }}
                tabStyle={{
                    width: 80,
                    paddingVertical: 0,
                    paddingHorizontal: 2,
                    marginVertical: 0,
                    minHeight: 30,
                    flexDirection: 'row'
                }}
                labelStyle={{
                    fontWeight: 'bold',
                    fontSize: 12,
                    marginVertical: 0,
                    paddingVertical: 0,
                }}
                activeColor='#B90000'
                inactiveColor='white'
                renderIcon={this.renderIcon}
            />
        </View>
    )

    renderIcon = ({ route }) => {
        if (route.key == 'chat') {
            return (
                <Ionicons color='green'
                    size={14}
                    name='chatbubble-ellipses-outline' />
            );
        }
        return null;
    }

    renderScene = ({ route }) => {
        const { route: { params: { event: propsEvent } } } = this.props;
        const { event, loading, refreshing } = this.state;
        switch (route.key) {
            case 'chat':
                return <RenderEventChatComponent event={propsEvent} />
            case 'matchup':
                return <RenderEventMatchupComponent event={event} loading={loading} refreshing={refreshing} onRefresh={this.onRefresh} />
            case 'lineup':
                return <RenderEventLineupComponent event={event} loading={loading} />
            case 'history':
                return <RenderEventHistoryComponent event={event} loading={loading} />
            default:
                return null
        }
    }

    favoriteIcon = () => {
        return (
            <TopNavigationAction
                icon={this.renderFavoriteIcon}
            />
        )
    }

    renderFavoriteIcon = (style) => {
        const { isFav } = this.state;
        if (isFav) {
            return (
                <TouchableOpacity activeOpacity={0.8}>
                    <MaterialIcons name="star-rate"
                        onPress={this.toggleFavorite}
                        color='#fdcb04'
                        size={20} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity activeOpacity={0.8}>
                    <MaterialIcons name="star-outline"
                        onPress={this.toggleFavorite}
                        color='#888'
                        size={20} />
                </TouchableOpacity>
            );
        }
    }

    toggleFavorite = () => {
        const { loading, refreshing, isFav } = this.state;
        const { user } = this.props;
        if (!user) {
            Toast.show('Please login to access your favorites.');
            return;
        }
        if (loading || refreshing) return;

        const { route: { params: { event } } } = this.props;
        this.setState({ refreshing: true });
        toggleFavoriteEvent(event.event_id, { isFav })
            .then(({ data }) => {
                const { success, isFav, error } = data;
                if (success) {
                    this.setState({ isFav });
                } else {
                    Toast.show(error);
                }
                this.setState({ refreshing: false });
            })
            .catch(() => {
                Toast.show('Cannot Add/Remove favorite event. Please try again later.');
                this.setState({ refreshing: false });
            })
    }

    render() {
        const { index, routes } = this.state;
        return (
            <View style={styles.container} >
                <TopNavigation
                    accessoryLeft={this.goBackAction}
                    accessoryRight={this.favoriteIcon}
                    title={this.renderTitle}
                    style={styles.headerStyle}
                />
                <TabView
                    renderTabBar={this.renderTabBar}
                    navigationState={{ index, routes }}
                    renderScene={this.renderScene}
                    onIndexChange={(index) => this._Mounted && this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />
            </View>
        )
    }
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(EventDetailScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    headerStyle: {
        backgroundColor: '#121212'
    },
    logoContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    teamLogoImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#121212',
        alignItems: 'center',
        width: screenWidth
    }
});
