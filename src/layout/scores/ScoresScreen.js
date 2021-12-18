import React, { Component, createRef } from 'react';
import { StyleSheet, View, Dimensions, BackHandler, Alert, Image, TouchableOpacity } from 'react-native';
import { TopNavigation, Text } from '@ui-kitten/components';
import { TabView, TabBar } from 'react-native-tab-view';
import ScoresPerSportScreen from './ScoresPerSportScreen';
import { getSportsIcon } from '../../libs/functions';
import smallAppIcon from '../../assets/images/hs-app-icon-72.png';
import { SearchIcon } from '../../libs/icons';

class ScoresScreen extends Component {
    constructor(props) {
        super(props);

        const tabs = [
            { key: 2274, title: 'NBA', type: 'league' },
            { key: 459, title: 'NFL', type: 'league' },
            { key: 474, title: 'NCAAF', type: 'league' },
            { key: null, title: 'All', type: 'sport' },
            { key: 270, title: 'CFL', type: 'league' },
            { key: 1926, title: 'NHL', type: 'league' },
            { key: 2638, title: 'NCAAB', type: 'league' },
            { key: 1040, title: 'UEFA CL', type: 'league' },
            { key: 1, title: 'Soccer', type: 'sport' },
            { key: 12, title: 'Football', type: 'sport' },
            { key: 18, title: 'Basketball', type: 'sport' },
            { key: 17, title: 'Hockey', type: 'sport' },
            { key: 16, title: 'Baseball', type: 'sport' },
        ];
        this.state = {
            index: 3,
            routes: tabs
        }
        this._Mounted = false;
        this.filterModalRef = createRef();
    }

    componentDidMount() {
        this._Mounted = true;
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this._Mounted = false;
        this.backHandler.remove();
    }

    backAction = () => {
        Alert.alert(
            "Close Heatscore",
            "Are you sure you close HeatScore?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        BackHandler.exitApp();
                    },
                },
                { text: "No", },
            ]
        );
        return true;
    };

    renderScene = ({ route }) => {
        const { navigation } = this.props;
        return (
            <ScoresPerSportScreen
                sport={route.type == 'sport' ? route.key : null}
                league={route.type == 'league' ? route.key : null}
                navigation={navigation} />
        )
    }

    renderTabBar = (props) => (
        <View style={styles.tabBarContainer}>
            <TabBar
                {...props}
                scrollEnabled
                style={{
                    backgroundColor: '#121212',
                    paddingVertical: 0,
                }}
                indicatorStyle={{
                    backgroundColor: '#B90000',
                    height: 1,
                    marginVertical: 0,
                }}
                tabStyle={{
                    width: 'auto',
                    paddingVertical: 0,
                    paddingHorizontal: 6,
                    marginVertical: 0,
                    minHeight: 30,
                }}
                labelStyle={{
                    fontWeight: 'bold',
                    fontSize: 12,
                    marginVertical: 0,
                    paddingVertical: 0,
                    marginBottom: 6,
                    textTransform: 'none',
                    backgroundColor: '#121212'
                }}
                activeColor='#B90000'
                inactiveColor='white'
                renderIcon={this.renderIcon}
            />
        </View>
    )

    renderIcon = ({ route, color }) => {
        return getSportsIcon(route.title, color, 20);
    }

    renderTitle = () => {
        return (
            <Text numberOfLines={1} style={styles.headerTitle}>
                All Scores
            </Text>
        )
    }

    onSelectLeague = (league) => {
        this._Mounted && this.setState({ league: league });
        this.filterModalRef.current?.close();
    }

    render() {
        const { index, routes } = this.state;
        const { navigation } = this.props;

        return (
            <View style={styles.container} >
                <TopNavigation title={this.renderTitle} style={styles.headerStyle} />
                <TouchableOpacity style={styles.searchHeader}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('Search')}>
                    <View style={styles.searchHeaderMain}>
                        <SearchIcon style={styles.searchIcon} />
                        <Text style={styles.searchHeaderText}>Teams, Events</Text>
                    </View>
                    <Image style={styles.searchHeaderIcon}
                        source={smallAppIcon} />
                </TouchableOpacity>
                <TabView
                    lazy
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

export default ScoresScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    headerStyle: {
        paddingBottom: 10,
        paddingTop: 24,
        minHeight: 0,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: '#888',
        fontSize: 16,
        alignItems: 'center',
        backgroundColor: '#121212',
        marginBottom: 10,
        justifyContent: 'center'
    },
    closeIcon: {
        height: 24,
        width: 24,
        marginHorizontal: 4,
        tintColor: '#FFF',
    },
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    searchHeader: {
        paddingHorizontal: 16,
        paddingBottom: 4,
        backgroundColor: '#111',
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchHeaderIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    searchHeaderMain: {
        flexDirection: 'row',
        backgroundColor: '#222',
        flex: 1,
        marginRight: 10,
        borderRadius: 4,
        alignItems: 'center',
        padding: 8
    },
    searchIcon: {
        height: 16,
        width: 16,
        tintColor: '#888'
    },
    searchHeaderText: {
        fontSize: 14,
        color: '#888',
        marginLeft: 10,
    }
});
