import React, { Component, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions
} from 'react-native';
import {
    TopNavigationAction,
    TopNavigation, Text
} from '@ui-kitten/components';
import { ArrowIosBackIcon } from '../../libs/icons';
import { TabView, TabBar } from 'react-native-tab-view';
import RenderEventMatchupComponent from './components/RenderEventMatchupComponent';
import RenderEventChatComponent from './components/RenderEventChatComponent';
import { truncateString } from '../../libs/functions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getEventDetail } from '../../redux/services';
import RenderEventLineupComponent from './components/RenderEventLineupComponent';
import RenderEventHistoryComponent from './components/RenderEventHistoryComponent';

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
            loading: false,
        }
        this._Mounted = false;
    }

    componentDidMount() {
        const { route: { params: { event } }, navigation } = this.props;
        if (!event) {
            navigation.navigate('AllScores');
        }
        this._Mounted = true;
        this._Mounted && this.setState({ loading: true })
        getEventDetail(event.event_id)
            .then(({ data }) => {
                const { success, event } = data;
                if (success) {
                    this._Mounted && this.setState({ event: event, loading: false });
                } else {
                    this._Mounted && this.setState({ event: null, loading: false });
                }
            })
            .catch(() => {
                this._Mounted && this.setState({ event: null, loading: false });
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

    renderTitle = () => {
        const { route: { params: { event } } } = this.props;
        if (!event) {
            return <Text style={styles.titleText}>Event Not Found</Text>
        }
        const { home, away } = event;
        return <View style={{ paddingTop: 2 }}>
            <Text style={styles.titleText}>{truncateString(event.home.name)} vs {truncateString(event.away.name)}</Text>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.teamLogoImage}
                    source={{ uri: `https://assets.b365api.com/images/team/m/${home.image_id}.png` }}
                />
                <Text style={styles.titleText}>-</Text>
                <Image
                    style={styles.teamLogoImage}
                    source={{ uri: `https://assets.b365api.com/images/team/m/${away.image_id}.png` }}
                />
            </View>
        </View>
    }

    renderTabBar = (props) => (
        <View style={styles.tabBarContainer}>
            <TabBar
                {...props}
                scrollEnabled
                style={{
                    backgroundColor: 'black',
                    paddingVertical: 0
                }}
                indicatorStyle={{
                    backgroundColor: 'yellow',
                    height: 1,
                    marginVertical: 0,
                }}
                tabStyle={{
                    width: 'auto',
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
        const { event, loading } = this.state;
        switch (route.key) {
            case 'chat':
                return <RenderEventChatComponent event={propsEvent} />
            case 'matchup':
                return <RenderEventMatchupComponent event={event} loading={loading} />
            case 'lineup':
                return <RenderEventLineupComponent event={event} loading={loading} />
            case 'history':
                return <RenderEventHistoryComponent event={event} loading={loading} />
            default:
                return null
        }
    }

    render() {
        const { index, routes } = this.state;
        return (
            <View style={styles.container} >
                <TopNavigation
                    accessoryLeft={this.goBackAction}
                    title={this.renderTitle}
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

export default EventDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 14,
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
    }
});
