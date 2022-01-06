import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import SelectEventPerDayComponent from './SelectEventPerDayComponent';
import { format, addDays, subDays } from 'date-fns';

class SelectEventPerSportComponent extends Component {
    constructor(props) {
        super(props);

        const tabs = [];
        let today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        today = new Date(year, month, day);

        tabs.push({ key: 'Today', title: 'Today', date: today });
        for (let i = 1; i < 8; i++) {
            const date = addDays(today, i);
            const tab = format(date, "MMM dd");
            tabs.push({ key: tab, title: tab, date: date });
        }

        this.state = {
            index: 0,
            league: null,
            routes: tabs,
            sport: props.sport,
            league: props.league
        }
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    renderScene = ({ route }) => {
        const { sport, league } = this.state;
        const { onSelect } = this.props;
        return (
            <SelectEventPerDayComponent
                date={route.date}
                sport={sport}
                league={league}
                onSelect={onSelect}
                keyDate={route.key}
            />
        )
    }

    renderTabBar = (props) => (
        <TabBar
            {...props}
            scrollEnabled
            style={{
                backgroundColor: '#121212',
                paddingVertical: 0
            }}
            indicatorStyle={{
                backgroundColor: '#B90000',
                height: 1,
                marginVertical: 0,
            }}
            tabStyle={{
                width: 'auto',
                paddingVertical: 0,
                paddingHorizontal: 2,
                marginVertical: 0,
                minHeight: 30,
            }}
            labelStyle={{
                fontWeight: 'bold',
                fontSize: 12,
                marginVertical: 0,
                paddingVertical: 0
            }}
            activeColor='#B90000'
            inactiveColor='white'
        />
    )

    render() {
        const { index, routes } = this.state;

        return (
            <View style={styles.container}>
                <TabView
                    lazy
                    lazyPreloadDistance={1}
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

export default SelectEventPerSportComponent;

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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 6,
        backgroundColor: '#111'
    },
    titleText: {
        fontSize: 18
    },
    closeIcon: {
        height: 24,
        width: 24,
        marginHorizontal: 4,
        tintColor: '#FFF',
    },
});
