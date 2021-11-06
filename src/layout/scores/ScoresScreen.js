import React, { Component, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import { Button, TopNavigationAction, TopNavigation } from '@ui-kitten/components';
import { ArrowDownwardIcon, ArrowIosBackIcon } from '../../components/icons';
import { TabView, TabBar } from 'react-native-tab-view';
import ScoresPerDayScreen from './ScoresPerDayScreen';
import ScoresLeagueScreen from './ScoresLeagueScreen';
import { connect } from 'react-redux';

class ScoresScreen extends Component {
    constructor(props) {
        super(props);
        const { tabs } = props;
        this.state = {
            index: 7,
            league: null,
            routes: tabs
        }
    }

    renderScene = ({ route }) => {
        const { league } = this.state;
        const { navigation } = this.props;
        if (league) {
            return (
                <ScoresLeagueScreen
                    date={route.date}
                    navigation={navigation}
                    league={league}
                />
            )
        }
        return (
            <ScoresPerDayScreen
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

    goBackAction = () => {
        const { league } = this.state;
        if (league) {
            return (
                <TopNavigationAction
                    icon={ArrowIosBackIcon}
                    onPress={() => this.setState({ league: null })}
                />
            )
        }
        return null;
    }

    renderTitle = () => {
        const { league } = this.props;
        return <Button style={styles.allScoresButton}
            accessoryRight={ArrowDownwardIcon}
            size="large">
            {league ? league.name : 'All Scores'}
        </Button>
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

const mapStateToProps = (state) => ({
    tabs: state.tabs
});

export default connect(mapStateToProps, null)(ScoresScreen);

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
        width: '50%',
        alignSelf: 'center',
    }
});
