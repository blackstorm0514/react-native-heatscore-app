import React, { Component, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import { Button, TopNavigationAction, TopNavigation, Text } from '@ui-kitten/components';
import { ArrowDownwardIcon, ArrowIosBackIcon } from '../../libs/icons';
import { TabView, TabBar } from 'react-native-tab-view';
import RenderLeagueRoundComponent from './components/RenderLeagueRoundComponent';
import RenderLeagueTopComponent from './components/RenderLeagueTopComponent';
import { getLeagueRound } from '../../redux/services';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class RoundLeagueScreen extends Component {
    constructor(props) {
        super(props);

        const { route: { params: { league } } } = props;
        this.state = {
            league: league,
            loading: false,
            index: 0,
            routes: [
                { key: 'rounds', title: 'Rounds' },
                { key: 'topscorer', title: 'Top Scorer' },
                { key: 'topassist', title: 'Top Assist' },
            ],
            rounds: null,
            topgoals: null,
            topassists: null,
        }
        this._Mounted = false;
    }

    componentDidMount() {
        const { league } = this.state;
        if (!league) {
            navigation.goBack();
        }
        this._Mounted = true;
        this.loadRoundData();
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    loadRoundData = () => {
        const { league } = this.state;
        this._Mounted && this.setState({ loading: true });
        getLeagueRound(league.id)
            .then(({ data }) => {
                const { rounds, topassists, topgoals } = data;
                this._Mounted && this.setState({
                    loading: false,
                    rounds: rounds,
                    topgoals: topgoals,
                    topassists: topassists
                })
            })
            .catch(() => {
                this._Mounted && this.setState({ loading: false });
            })
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
        const { league } = this.state;
        return <Button style={styles.allScoresButton}
            size="large">
            <Text numberOfLines={1}>{league.name}</Text>
        </Button>
    }

    renderTabBar = (props) => (
        <View style={styles.tabBarContainer}>
            <TabBar
                {...props}
                scrollEnabled
                style={{
                    backgroundColor: '#121212',
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
                    paddingHorizontal: 4,
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
                renderIcon={this.renderIcons}
            />
        </View>
    )

    renderIcons = ({ route }) => {
        switch (route.key) {
            case 'topscorer':
                return (
                    <MaterialIcons color='green'
                        size={16}
                        name='sports-soccer' />
                );
            case 'topassist':
                return (
                    <MaterialIcons color='green'
                        size={16}
                        name='assistant-photo' />
                );
            default:
                return null;
        }
    }

    renderScene = ({ route }) => {
        const { loading, rounds, topassists, topgoals } = this.state;
        if (route.key == 'rounds') {
            return <RenderLeagueRoundComponent loading={loading}
                rounds={rounds} />
        } else if (route.key == 'topscorer') {
            return <RenderLeagueTopComponent loading={loading}
                topgoals={topgoals} />
        }
        else if (route.key == 'topassist') {
            return <RenderLeagueTopComponent loading={loading}
                topassists={topassists} />
        }
    }

    render() {
        const { index, routes } = this.state;

        return (
            <View style={styles.container} >
                <TopNavigation
                    style={styles.headerStyle}
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

export default RoundLeagueScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    allScoresButton: {
        color: 'white',
        borderRadius: 0,
        borderColor: 0,
        backgroundColor: '#121212',
        fontSize: 14,
        alignSelf: 'center',
        maxWidth: '70%',
        overflow: 'hidden'
    },
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    headerStyle: {
        backgroundColor: '#121212'
    }
});
