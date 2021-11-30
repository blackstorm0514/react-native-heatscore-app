import React, { PureComponent, createRef } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Button, TopNavigation, Text } from '@ui-kitten/components';
import { TabView, TabBar, TabBarItem, TabBarIndicator } from 'react-native-tab-view';
import ScoreCardPerDayScreen from './ScoreCardPerDayScreen';
import { format, addDays, subDays } from 'date-fns';
import { PlusOutlineIcon } from '../../libs/icons';
import { Modalize } from 'react-native-modalize';
import AddScoreModalContent from './components/AddScoreModalContent';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { addScoreCard } from '../../redux/services';

class ScoreCardScreen extends PureComponent {
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
            routes: tabs,

            event: null,
            team: null,
            type: null,
            timeline: null,
            points: null,
            allowAlerts: true,
            alert_gameStart: true,
            alert_gameEnd: true,
            alert_gameScoring: false,

            submitting: false,
            newlyAdded: null,
        }

        this.addModalRef = createRef();
    }

    renderScene = ({ route }) => {
        const { navigation } = this.props;
        const { newlyAdded } = this.state;
        return (
            <ScoreCardPerDayScreen
                date={route.date}
                keyDate={route.key}
                newlyAdded={newlyAdded}
                setLeague={(league) => this.setState({ league: league })}
                navigation={navigation} />
        )
    }

    renderTabBar = (props) => (
        <TabBar
            {...props}
            scrollEnabled
            style={{
                backgroundColor: 'black',
                paddingVertical: 0
            }}
            indicatorStyle={{
                backgroundColor: 'white',
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
            Toast.show('Please login to add a Score Card.');
            return;
        }
        this.addModalRef.current?.open();
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

    renderModalHeader = () => {
        const { submitting } = this.state;
        return (
            <View style={styles.addModalHeader}>
                <TouchableOpacity activeOpacity={0.7}
                    onPress={() => this.addModalRef.current?.close()}>
                    <Text style={styles.modalHeaderAction}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalHeaderTitle}>Add Game</Text>
                <TouchableOpacity activeOpacity={0.7}
                    onPress={this.onAddScoreCard}
                    disabled={submitting}
                >
                    <Text style={styles.modalHeaderAction}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onAddScoreCard = () => {
        const {
            event, team, type, timeline, points,
            allowAlerts, alert_gameStart, alert_gameEnd, alert_gameScoring
        } = this.state;

        if (!event) {
            return Toast.show('Please select an event.');
        }
        if (!team) {
            return Toast.show('Please select a team.');
        }
        if (!type) {
            return Toast.show('Please select a bet type.');
        }
        if (!timeline) {
            return Toast.show('Please select a timeline.');
        }
        if (!points && ['spread', 'total'].includes(type)) {
            return Toast.show('Please select points for spread or total.');
        }
        this.setState({ submitting: true });
        addScoreCard({
            event_id: event.event_id, team, type, timeline, points,
            allowAlerts, alert_gameStart, alert_gameEnd, alert_gameScoring
        })
            .then(({ data }) => {
                const { success, time, error } = data;
                if (success) {
                    this.addModalRef.current?.close();
                    this.setState({
                        event: null,
                        team: null,
                        type: null,
                        timeline: null,
                        points: null,
                        allowAlerts: true,
                        alert_gameStart: true,
                        alert_gameEnd: true,
                        alert_gameScoring: false,

                        submitting: false,
                        newlyAdded: time
                    })
                } else {
                    Toast.show(error);
                    this.setState({ submitting: false });
                }
            })
            .catch(error => {
                Toast.show('Cannot add a score card. Please try again later.');
                this.setState({ submitting: false });
            })
    }

    render() {
        const { index, routes, event, team, type, timeline, points,
            allowAlerts, alert_gameStart, alert_gameEnd, alert_gameScoring,
        } = this.state;

        return (
            <View style={styles.container} >
                <TopNavigation
                    title={this.renderTitle}
                    accessoryRight={this.addScoreCardActionButton}
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
                <Modalize
                    ref={this.addModalRef}
                    HeaderComponent={this.renderModalHeader}
                    scrollViewProps={{ showsVerticalScrollIndicator: true }}
                    adjustToContentHeight={true}>
                    <AddScoreModalContent
                        event={event}
                        team={team}
                        type={type}
                        timeline={timeline}
                        points={points}
                        allowAlerts={allowAlerts}
                        alert_gameStart={alert_gameStart}
                        alert_gameEnd={alert_gameEnd}
                        alert_gameScoring={alert_gameScoring}
                        updateEvent={(obj) => this.setState(obj)}
                    />
                </Modalize>
            </View>
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
        paddingVertical: 10
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
