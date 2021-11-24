import React, { Component, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import { Button, TopNavigationAction, TopNavigation, Text } from '@ui-kitten/components';
import { TabView, TabBar } from 'react-native-tab-view';
import ScoreCardPerDayScreen from './ScoreCardPerDayScreen';
import { format, addDays, subDays } from 'date-fns';
import { PlusOutlineIcon } from '../../components/icons';

class ScoreCardScreen extends Component {
    constructor(props) {
        super(props);

        const tabs = [];
        let today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        today = new Date(year, month, day);

        for (let i = 7; i > 0; i--) {
            const date = subDays(today, i);
            const tab = format(date, "MMM dd");
            tabs.push({ key: tab, title: tab, date: date });
        }
        tabs.push({ key: 'Today', title: 'Today', date: today });
        for (let i = 1; i < 8; i++) {
            const date = addDays(today, i);
            const tab = format(date, "MMM dd");
            tabs.push({ key: tab, title: tab, date: date });
        }

        this.state = {
            index: 7,
            routes: tabs
        }
    }

    renderScene = ({ route }) => {
        const { navigation } = this.props;
        return (
            <ScoreCardPerDayScreen
                date={route.date}
                keyDate={route.key}
                setLeague={(league) => this.setState({ league: league })}
                navigation={navigation} />
        )
    }

    renderTabBar = (props) => (
        <TabBar
            {...props}
            scrollEnabled
            style={{ backgroundColor: 'black' }}
            indicatorStyle={{ backgroundColor: 'white' }}
            tabStyle={{ width: 'auto' }}
            labelStyle={{ fontWeight: 'bold' }}
        />
    )

    renderTitle = () => {
        const { league } = this.state;
        return <Button style={styles.allScoresButton}
            size="large">
            <Text numberOfLines={1}>
                Score Card
            </Text>
        </Button>
    }

    addScoreCardAction = () => {
        return (
            <Button style={styles.addFavoriteButton}
                appearance='ghost'
                status='danger'
                size='medium'
                // onPress={this.goToAddFavorite}
                accessoryLeft={PlusOutlineIcon} />
        )
    }

    render() {
        const { index, routes } = this.state;

        return (
            <View style={styles.container} >
                <TopNavigation
                    title={this.renderTitle}
                    accessoryRight={this.addScoreCardAction}
                />
                <TabView
                    lazy
                    lazyPreloadDistance={1}
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


export default ScoreCardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    allScoresButton: {
        color: 'white',
        borderRadius: 0,
        borderColor: 0,
        backgroundColor: 'black',
        fontSize: 20,
        maxWidth: '70%',
        alignSelf: 'center',
    },
    addFavoriteButton: {
        width: 20,
        height: 20,
        alignSelf: 'flex-end'
    },
});
