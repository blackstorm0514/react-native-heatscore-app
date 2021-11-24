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
import { ArrowIosBackIcon } from '../../components/icons';
import { TabView, TabBar } from 'react-native-tab-view';
import RenderEventMatchupComponent from './components/RenderEventMatchupComponent';
import RenderEventChatComponent from './components/RenderEventChatComponent';

class EventDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            routes: [
                { key: 'chat', title: 'Chat' },
                { key: 'matchup', title: 'MatchUp' },
            ]
        }
    }

    componentDidMount() {
        const { route: { params: { event } }, navigation } = this.props;
        if (!event) {
            navigation.navigate('AllScores');
        }
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
        return <View style={{ paddingTop: 5 }}>
            <Text style={styles.titleText}>{event.home.name} vs {event.away.name}</Text>
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
                style={{ backgroundColor: 'black', justifyContent: 'center', }}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}
                tabStyle={{ width: 'auto' }}
                labelStyle={{ fontWeight: 'bold' }}
            />
        </View>
    )

    renderScene = ({ route }) => {
        const { route: { params: { event } } } = this.props;
        if (route.key == 'chat')
            return <RenderEventChatComponent event={event} />
        return <RenderEventMatchupComponent event={event} />
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
                    onIndexChange={(index) => this.setState({ index })}
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
        fontSize: 20,
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
