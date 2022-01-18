import React, { Component, useEffect, useState } from 'react';
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
const EventDetailScreen = (props) => {
    const routes = [
        { key: 'chat', title: 'Chat' },
        { key: 'matchup', title: 'MatchUp' },
        { key: 'lineup', title: 'LineUp' },
        { key: 'history', title: 'History' }
    ];
    const [index, setIndex] = useState(1);
    const [event, setEvent] = useState(null);
    const [isFav, setIsFav] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const { route: { params: { event } }, navigation } = props;
        if (!event) {
            navigation.navigate('AllScores');
        }
        getEventData();
    }, [])


    const getEventData = (refreshing = false) => {
        const { route: { params: { event } } } = props;
        (refreshing ? setRefreshing : setLoading)(true);
        getEventDetail(event.event_id)
            .then(({ data }) => {
                const { success, event, isFav } = data;
                if (success) {
                    setEvent(event);
                    setIsFav(isFav);
                } else {
                    setEvent(null);
                    setIsFav(false);
                }
                (refreshing ? setRefreshing : setLoading)(false);
            })
            .catch(() => {
                setEvent(null);
                setIsFav(false);
                (refreshing ? setRefreshing : setLoading)(false);
            })
    }

    const goBackAction = () => {
        const { navigation } = props;
        return (
            <TopNavigationAction
                icon={ArrowIosBackIcon}
                onPress={() => navigation.goBack()}
            />
        )
    }

    const onRefresh = () => {
        getEventData(true);
    }

    const renderTitle = () => {
        const { route: { params: { event } } } = props;
        if (!event) {
            return <Text style={styles.titleText}>Event Not Found</Text>
        }
        const { home, away } = event;
        return <View style={{ paddingTop: 2 }}>
            <Text style={styles.titleText}>{truncateString(home.name)} vs {truncateString(away.name)}</Text>
        </View>
    }

    const renderTabBar = (props) => (
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
                    // minHeight: 30,
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
                renderIcon={renderIcon}
            />
        </View>
    )

    const renderIcon = ({ route }) => {
        if (route.key == 'chat') {
            return (
                <Ionicons color='green'
                    size={14}
                    name='chatbubble-ellipses-outline' />
            );
        }
        return null;
    }

    const renderScene = ({ route }) => {
        const { route: { params: { event: propsEvent } } } = props;
        switch (route.key) {
            case 'chat':
                return <RenderEventChatComponent event={propsEvent} />
            case 'matchup':
                return <RenderEventMatchupComponent event={event} loading={loading} refreshing={refreshing} onRefresh={onRefresh} />
            case 'lineup':
                return <RenderEventLineupComponent event={event} loading={loading} />
            case 'history':
                return <RenderEventHistoryComponent event={event} loading={loading} />
            default:
                return null
        }
    }

    const favoriteIcon = () => {
        return (
            <TopNavigationAction
                icon={renderFavoriteIcon}
            />
        )
    }

    const renderFavoriteIcon = (style) => {
        if (isFav) {
            return (
                <TouchableOpacity activeOpacity={0.8}>
                    <MaterialIcons name="star-rate"
                        onPress={toggleFavorite}
                        color='#fdcb04'
                        size={24} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity activeOpacity={0.8}>
                    <MaterialIcons name="star-outline"
                        onPress={toggleFavorite}
                        color='#888'
                        size={24} />
                </TouchableOpacity>
            );
        }
    }

    const toggleFavorite = () => {
        const { user } = props;
        if (!user) {
            Toast.show('Please login to access your favorites.');
            return;
        }
        if (loading || refreshing) return;

        const { route: { params: { event } } } = props;
        setRefreshing(true)
        toggleFavoriteEvent(event.event_id, { isFav })
            .then(({ data }) => {
                const { success, isFav, error } = data;
                if (success) {
                    setIsFav(isFav)
                } else {
                    Toast.show(error);
                }
                setRefreshing(false);
            })
            .catch(() => {
                Toast.show('Cannot Add/Remove favorite event. Please try again later.');
                setRefreshing(false);
            })
    }

    return (
        <View style={styles.container} >
            <TopNavigation
                accessoryLeft={goBackAction}
                accessoryRight={favoriteIcon}
                title={renderTitle}
                style={styles.headerStyle}
            />
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={(index) => setIndex(index)}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
        </View>
    )
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
