import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    useWindowDimensions
} from 'react-native';
import { Button } from '@ui-kitten/components';
import { ArrowDownwardIcon } from '../../components/icons';
import { format, addDays, subDays } from 'date-fns';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ScoresPerDayScreen from './ScoresPerDayScreen';

export default ({ navigation }) => {
    const [index, setIndex] = useState(7);
    const layout = useWindowDimensions();

    const tabs = [];
    const sceneMap = {};
    const today = new Date();
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
    const renderScene = ({ route }) => (
        <ScoresPerDayScreen date={route.date} navigation={navigation} />
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
                lazy
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    )
};

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
