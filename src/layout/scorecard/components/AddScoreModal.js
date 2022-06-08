import React, { Component, createRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Text, ViewPager } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SelectTeamComponent from './SelectTeamComponent';
import SelectTypeComponent from './SelectTypeComponent';
import SelectTimeLineComponent from './SelectTimeLineComponent';
import SelectPointComponent from './SelectPointComponent';
import SelectEventComponent from './SelectEventComponent';
import Toast from 'react-native-simple-toast';
import { truncateString } from "../../../libs/functions";
import ManageAlertComponent from "./ManageAlertComponent";
import { addScoreCard } from "../../../redux/services";
import { ArrowIosBackIcon } from '../../../libs/icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenHeight = Dimensions.get('screen').height;

const defaultEventTemplate = {
    event: null,
    team: null,
    type: null,
    timeline: null,
    points: 0,
    allowAlerts: true,
    alert_gameStart: true,
    alert_gameEnd: true,
    alert_gameScoring: false,
}

export default class AddScoreModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,

            ...defaultEventTemplate,

            submitting: false,
        }

        this._Mounted = false;
        this.addModalRef = createRef();
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => { console.log("here"); this.onCloseModal(); return true; }
        );
    }

    componentDidMount() {
        this._Mounted = true;
    }

    componentWillUnmount() {
        this._Mounted = false;
        this.backHandler.remove();
    }

    getSnapshotBeforeUpdate(prevProps) {
        return { shouldOpen: !prevProps.modalOpen && this.props.modalOpen };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.points != nextState.points) {
            return false;
        }
        return true;
    }

    async componentDidUpdate(prevProps, parevState, snapshot) {
        const { defaultEvent } = this.props;
        if (snapshot.shouldOpen) {
            if (defaultEvent) {
                this._Mounted && await this.setState({
                    selectedIndex: 1,
                    ...defaultEventTemplate,
                    event: defaultEvent,
                })
            } else {
                this._Mounted && await this.setState(defaultEventTemplate)
            }
            this.addModalRef.current?.open();
        }
    }

    onCloseModal = () => {
        const { onAddScoreCard } = this.props;
        this.setState({
            event: null,
            team: null,
            type: null,
            timeline: null,
            points: 0,
            allowAlerts: true,
            alert_gameStart: true,
            alert_gameEnd: true,
            alert_gameScoring: false,
        })
        this.addModalRef.current?.close();
        onAddScoreCard(null);
    }

    renderModalHeader = () => {
        const { submitting, selectedIndex } = this.state;
        return (
            <View style={styles.addModalHeader}>
                <TouchableOpacity activeOpacity={0.7}
                    disabled={submitting}
                    onPress={selectedIndex == 0 ? () => this.onChangeIndex(1) : this.onCloseModal}
                    style={{ marginRight: 'auto' }}>
                    {selectedIndex == 1 && <Text style={styles.modalHeaderAction}>Cancel</Text>}
                    {selectedIndex == 0 && <ArrowIosBackIcon style={styles.modalBackIcon} />}
                </TouchableOpacity>
                <Text style={styles.modalHeaderTitle}>{selectedIndex == 0 ? 'Choose a Game' : 'Add Your Bet'}</Text>
                <TouchableOpacity activeOpacity={0.7}
                    disabled={submitting}
                    onPress={this.onSubmit}
                    style={{ marginLeft: 'auto' }}>
                    <Text style={styles.modalHeaderAction}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onChangeIndex = (index = 1) => {
        this._Mounted && this.setState({ selectedIndex: index })
    }

    onAddScoreCard = (time, event = null) => {
        const { onAddScoreCard } = this.props;
        time && this.addModalRef.current?.close();
        time && onAddScoreCard(time, event);
    }

    onSelectEvent = (event) => {
        this._Mounted && this.setState({
            selectedIndex: 1,
            event: event,
            team: null,
            type: null,
            timeline: null,
            points: 0,
        });
    }

    onSelectType = (type) => {
        if (!type) { return Toast.show('Please select bet type.'); }
        this.setState({ type: type })
    }

    onSelectTeam = (team) => {
        if (!team) { return Toast.show('Please select a team.'); }
        this.setState({ team: team })
    }

    onSelectTimeline = (timeline) => {
        if (!timeline) { return Toast.show('Please select timeline.'); }
        this.setState({ timeline: timeline })
    }

    onSelectPoints = (points) => {
        this.setState({ points: points })
    }

    onChangeAlerts = (key, value) => {
        this.setState({ [key]: value });
    }

    onSubmit = async () => {
        const {
            event,
            team,
            type,
            timeline,
            points,
            allowAlerts,
            alert_gameStart,
            alert_gameEnd,
            alert_gameScoring
        } = this.state;

        if (!event) {
            this.onAddScoreCard(null);
            return Toast.show('Please select a game.');
        }
        if (!type) {
            this.onAddScoreCard(null);
            return Toast.show('Please select bet type.');
        }
        if (!team) {
            this.onAddScoreCard(null);
            return Toast.show('Please select a team.');
        }
        if (!timeline) {
            this.onAddScoreCard(null);
            return Toast.show('Please select timeline.');
        }
        if (!points && ['total', 'spread', 'total_home', 'total_away'].includes(type)) {
            this.onAddScoreCard(null);
            return Toast.show('Please select points.');
        }

        const numberPoints = Number(points)
        if (isNaN(numberPoints)) {
            this.onAddScoreCard(null);
            return Toast.show('Please input valid points.');
        }

        this._Mounted && this.setState({ submitting: true });
        addScoreCard({
            event_id: event.event_id, team, type, timeline, points: numberPoints,
            allowAlerts,
            alert_gameStart,
            alert_gameEnd,
            alert_gameScoring
        })
            .then(({ data }) => {
                const { success, time, error } = data;
                if (success) {
                    this.onAddScoreCard(time, event);
                } else {
                    Toast.show(error);
                    this.onAddScoreCard(null);
                }
                this._Mounted && this.setState({ submitting: false });
            })
            .catch(error => {
                Toast.show('Cannot add a score card. Please try again later.');
                this._Mounted && this.setState({ submitting: false });
                this.onAddScoreCard(null);
            })
    }

    render() {
        const { event, team, type, timeline, points,
            allowAlerts, alert_gameStart, alert_gameEnd, alert_gameScoring,
            submitting, selectedIndex
        } = this.state;

        return (
            <Modalize
                ref={this.addModalRef}
                HeaderComponent={this.renderModalHeader}
                disableScrollIfPossible
                modalStyle={{ backgroundColor: '#121212' }}>
                    <SafeAreaView>
                <ViewPager selectedIndex={selectedIndex}
                    swipeEnabled={false}
                    style={{ backgroundColor: '#121212', flex: 1 }}>
                    <SelectEventComponent key="2"
                        onSelect={this.onSelectEvent} />
                    <View style={styles.container} key="1">
                        <TouchableOpacity style={styles.itemContainer}
                            activeOpacity={0.8}
                            onPress={() => this.onChangeIndex(0)}>
                            <Text style={styles.itemTitleText}>GAME</Text>
                            <View style={styles.itemContent}>
                                <Text style={styles.itemContentText}>{event ? `${truncateString(event.home.name)} VS ${truncateString(event.away.name)}` : 'Select'}</Text>
                                <FontAwesomeIcon style={styles.itemContentIcon} color='#999' size={18} name='angle-right' />
                            </View>
                        </TouchableOpacity>
                        <SelectTypeComponent
                            type={type}
                            onSelect={this.onSelectType} />
                        <SelectTeamComponent
                            event={event}
                            team={team}
                            type={type}
                            onSelect={this.onSelectTeam}
                            onSelectType={this.onSelectType}
                        />
                        <SelectTimeLineComponent
                            event={event}
                            timeline={timeline}
                            onSelect={this.onSelectTimeline}
                        />
                        <SelectPointComponent
                            points={points}
                            type={type}
                            onSelect={this.onSelectPoints}
                        />
                        <ManageAlertComponent
                            allowAlerts={allowAlerts}
                            alert_gameStart={alert_gameStart}
                            alert_gameEnd={alert_gameEnd}
                            alert_gameScoring={alert_gameScoring}
                            onSelect={this.onChangeAlerts}
                            disabled={submitting}
                        />
                    </View>
                </ViewPager>
                </SafeAreaView>
            </Modalize>
        )
    }
};

const styles = StyleSheet.create({
    addModalHeader: {
        flexDirection: 'row',
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 42
    },
    modalBackIcon: {
        height: 20,
        width: 20,
        tintColor: '#E10032'
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
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 10,
        minHeight: screenHeight - 140
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        alignItems: 'center',
        borderBottomColor: '#222',
        borderBottomWidth: 1,
    },
    itemTitleText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white'
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    itemContentText: {
        fontSize: 14,
        fontWeight: '100',
        color: '#999',
        alignItems: 'center',
        alignContent: 'center'
    },
    itemContentIcon: {
        marginLeft: 8
    },
});