import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    useWindowDimensions
} from 'react-native';
import { Button, TopNavigationAction, TopNavigation } from '@ui-kitten/components';
import { ArrowDownwardIcon, ArrowIosBackIcon } from '../../components/icons';
import { TabView, TabBar } from 'react-native-tab-view';
import ScoresPerDayScreen from './ScoresPerDayScreen';
import ScoresLeagueScreen from './ScoresLeagueScreen';
import { connect } from 'react-redux';

const ScoresScreen = ({ navigation, tabs }) => {
    const [index, setIndex] = useState(7);
    const [league, setLeague] = useState(null);
    const layout = useWindowDimensions();
    const [routes] = useState(tabs);

    const renderScene = ({ route }) => (
        league ? <ScoresLeagueScreen
            date={route.date}
            navigation={navigation}
            league={league}
        /> :
            <ScoresPerDayScreen
                date={route.date}
                keyDate={route.key}
                setLeague={setLeague}
                navigation={navigation} />
    );

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            scrollEnabled
            style={{ backgroundColor: 'black' }}
            indicatorStyle={{ backgroundColor: 'white' }}
            tabStyle={{ width: 'auto' }}
            labelStyle={{ fontWeight: 'bold' }}
        />
    )

    const goBackAction = () => (
        league ? <TopNavigationAction
            icon={ArrowIosBackIcon}
            onPress={() => setLeague(null)}
        /> : null
    )

    const renderTitle = () => (
        <Button style={styles.allScoresButton}
            accessoryRight={ArrowDownwardIcon}
            size="large">
            {league ? league.name : 'All Scores'}
        </Button>
    )
    console.log(league)
    return (
        <View style={styles.container}>
            <TopNavigation
                accessoryLeft={goBackAction}
                title={renderTitle}
            />
            <TabView
                lazy
                // lazyPreloadDistance={2}
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    )
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
    topBarContainer: {
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
