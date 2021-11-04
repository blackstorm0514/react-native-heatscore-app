import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    useWindowDimensions
} from 'react-native';
import { Button } from '@ui-kitten/components';
import { ArrowDownwardIcon } from '../../components/icons';
import { TabView, TabBar } from 'react-native-tab-view';
import ScoresPerDayScreen from './ScoresPerDayScreen';
import { connect } from 'react-redux';

const ScoresScreen = ({ navigation, tabs }) => {
    const [index, setIndex] = useState(7);
    const layout = useWindowDimensions();

    const renderScene = ({ route }) => (
        <ScoresPerDayScreen date={route.date} keyDate={route.key} navigation={navigation} />
    );
    const [routes] = useState(tabs);

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

    return (
        <View style={styles.container}>
            <Button style={styles.allScoresButton}
                accessoryRight={ArrowDownwardIcon}
                size="large">
                All Scores
            </Button>
            <TabView
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
