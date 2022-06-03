import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import { Button, TopNavigation, Text } from '@ui-kitten/components';
import { TabView, TabBar } from 'react-native-tab-view';
import ScoreCardPerDayScreen from './ScoreCardPerDayScreen';
import { format, addDays, subDays } from 'date-fns';
import { PlusOutlineIcon } from '../../libs/icons';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import AddScoreModal from './components/AddScoreModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
class ScoreCardScreen extends PureComponent {
    constructor(props) {
        super(props);

        const tabs = [];
        let today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        today = new Date(year, month, day);

        for (let i = 1; i > 0; i--) {
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
            index: 1,
            routes: tabs,

            modalOpen: false,
            defaultEvent: null,
            newlyAdded: null,
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
        const { navigation } = this.props;
        const { newlyAdded } = this.state;
        return (
            <ScoreCardPerDayScreen
                date={route.date}
                keyDate={route.key}
                newlyAdded={newlyAdded}
                addModalOpen={this.onAddModalOpen}
                setLeague={(league) => this._Mounted && this.setState({ league: league })}
                navigation={navigation} />
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

    renderTitle = () => {
        return <View style={styles.allScoresButton}>
            <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16 }}>
                Score Card
            </Text>
        </View>
    }

    onAddModalOpen = () => {
        const { user } = this.props;
        if (!user) {
            return Toast.show('Please login to add a Score Card.');
        }
        this.setState({ modalOpen: true });
    }

    addScoreCardActionButton = () => {
        return (
            <Button style={styles.addScoresButton}
                appearance='ghost'
                status='danger'
                size='medium'
                onPress={this.onAddModalOpen}
                accessoryLeft={PlusOutlineIcon} />
        )
    }

    onAddScoreCard = async (time, event) => {
        if (time) {
            this._Mounted && await this.setState({
                newlyAdded: time,
                modalOpen: false,
                defaultEvent: null,
            });
            Alert.alert(
                "Add another Score Card",
                "Do you want to add a bet for the same game?",
                [
                    { text: "No", },
                    {
                        text: "Yes",
                        onPress: async () => {
                            this._Mounted && await this.setState({
                                modalOpen: true,
                                defaultEvent: event
                            });
                        },
                    },
                ]
            );
        } else {
            this._Mounted && this.setState({
                modalOpen: false,
                defaultEvent: null
            });
        }
    }

    render() {
        const { index, routes, modalOpen, defaultEvent } = this.state;

        return (
            <SafeAreaView style={styles.container} >
                <TopNavigation
                    title={this.renderTitle}
                    accessoryRight={this.addScoreCardActionButton}
                    style={styles.headerStyle}
                />
                <TabView
                    lazy
                    lazyPreloadDistance={1}
                    renderTabBar={this.renderTabBar}
                    navigationState={{ index, routes }}
                    renderScene={this.renderScene}
                    onIndexChange={(index) => this._Mounted && this.setState({ index })}
                    initialLayout={{ width: screenWidth }}
                />
                <AddScoreModal onAddScoreCard={this.onAddScoreCard}
                    defaultEvent={defaultEvent}
                    modalOpen={modalOpen} />
            </SafeAreaView>
        )
    }
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(ScoreCardScreen);

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
        fontSize: 20,
        maxWidth: '70%',
        alignSelf: 'center',
    },
    headerStyle: {
        backgroundColor: '#121212'
    },
    addScoresButton: {
        width: 20,
        height: 20,
        alignSelf: 'flex-end'
    },
    addModalHeader: {
        flexDirection: 'row',
        backgroundColor: '#222',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 42
    },
    modalHeaderAction: {
        color: '#E10032',
        fontSize: 14
    },
    modalHeaderTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
});
