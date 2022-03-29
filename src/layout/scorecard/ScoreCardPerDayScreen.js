import React, { PureComponent } from 'react';
import { Alert, StyleSheet, View, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { LoadingIndicator } from '../scores/components/LoadingIndicator';
import ScoreCardComponent from './components/ScoreCardComponent';
import { deleteScoreCard, getScoreCards } from '../../redux/services';
import Toast from 'react-native-simple-toast';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Menu, MenuItem, MenuDivider } from '../../components/menu';

class ScoreCardList extends PureComponent {
    render() {
        const { data, renderItem, ListHeaderComponent } = this.props;

        return (
            <View>
                <ListHeaderComponent />
                {data.map(renderItem)}
            </View>
        );
    }
}

class ScoreCardPerDayScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            refreshing: false,
            data: [],
            showMenu: false,
            showMode: 'basic',
            inplayTimeout: null,
            upcomingTimeout: null,
        }
        this._Mounted = false;
    }

    componentDidMount() {
        const { navigation } = this.props;
        this._Mounted = true;
        this.getEventsData();
        this.willFocusSubscription = navigation.addListener('focus', () => this.getEventsData(false, true));
    }

    componentWillUnmount() {
        this._Mounted = false;
        if (this.willFocusSubscription) {
            this.willFocusSubscription();
        }
        this.clearInplayUpcomingTimeout();
    }

    clearInplayUpcomingTimeout = () => {
        const { inplayTimeout, upcomingTimeout } = this.state;
        if (inplayTimeout) {
            clearTimeout(inplayTimeout);
        }
        if (upcomingTimeout) {
            clearTimeout(upcomingTimeout)
        }
    }

    getEventsData = (loading = true, refreshing = false) => {
        const { date, keyDate } = this.props;
        const { loading: loadingState, refreshing: refreshingState } = this.state;
        if (loadingState || refreshingState) return;

        this._Mounted && this.setState({ loading: loading, refreshing: refreshing });
        getScoreCards(date)
            .then(({ data: result }) => {
                const { success, data: score_cards } = result;
                this.clearInplayUpcomingTimeout();
                if (success) {
                    let hasInplay = false;
                    let hasUpcoming = false;
                    for (const score_card of score_cards) {
                        if (score_card.event.time_status == "1") {
                            hasInplay = true;
                        }
                        if (score_card.event.time_status == "0") {
                            hasUpcoming = true;
                        }
                    }
                    let inplayTimeout = null;
                    if (hasInplay) {
                        inplayTimeout = setInterval(() => this.getEventsData(false, false), 15 * 1000);
                    }
                    let upcomingTimeout = null;
                    if (!hasInplay && hasUpcoming && keyDate == 'Today') {
                        upcomingTimeout = setTimeout(() => this.getEventsData(false, false), 10 * 60 * 1000);
                    }
                    this._Mounted && this.setState({
                        data: score_cards,
                        loading: false,
                        refreshing: false,
                        inplayTimeout,
                        upcomingTimeout,
                    });
                } else {
                    this._Mounted && this.setState({
                        data: [],
                        loading: false,
                        refreshing: false,
                        inplayTimeout: null,
                        upcomingTimeout: null,
                    });
                }
            })
            .catch(() => {
                this.clearInplayUpcomingTimeout();
                this._Mounted && this.setState({
                    loading: false,
                    refreshing: false,
                    data: [],
                    inplayTimeout: null,
                    upcomingTimeout: null,
                });
            });
    }

    onHideMenu = () => {
        this._Mounted && this.setState({ showMenu: false });
    }

    onShowMenu = () => {
        this._Mounted && this.setState({ showMenu: true });
    }

    onPressViewMode = (mode) => {
        this._Mounted && this.setState({ showMenu: false, showMode: mode });
    }

    renderHeader = (item, isTop = false) => {
        const { showMenu } = this.state;
        return (
            <View style={styles.listHeader}>
                <Text style={styles.listHeaderText}>{item}</Text>
                {isTop && <Menu
                    visible={showMenu}
                    style={{ alignSelf: 'flex-end', backgroundColor: '#222' }}
                    anchor={<TouchableOpacity activeOpacity={0.8}
                        onPress={this.onShowMenu}>
                        <EntypoIcon name="dots-three-vertical"
                            size={14} color="white" />
                    </TouchableOpacity>}
                    onRequestClose={this.onHideMenu}>
                    <MenuItem disabled textStyle={styles.menuTitleTextStyle}>Actions</MenuItem>
                    <MenuDivider color="#555" />
                    <MenuItem onPress={() => this.onPressViewMode('basic')} textStyle={styles.menuTextStyle}>Reg View</MenuItem>
                    <MenuItem onPress={() => this.onPressViewMode('total')} textStyle={styles.menuTextStyle}>O/U View</MenuItem>
                </Menu>}
            </View>
        );
    }

    renderScoreCard = (item, index) => {
        const { showMode } = this.state;
        return showMode == 'basic' || item.type.startsWith(showMode) ? (
            <ScoreCardComponent
                card={item}
                showMode={showMode}
                onDeleteCard={this.onDeleteCard}
                key={index}
            />
        ) : null
    }

    renderScoreList = (item, index) => {
        const { data } = this.state;
        const notStartedEvents = [];
        const inPlayEvents = [];
        const endedEvents = [];
        const otherEvents = [];
        for (const card of data) {
            const { event: { time_status } } = card;
            switch (time_status) {
                case '0':
                    notStartedEvents.push(card);
                    break;
                case '1':
                    inPlayEvents.push(card);
                    break;
                case '2':
                case '3':
                    endedEvents.push(card);
                    break;
                default:
                    otherEvents.push(card);
                    break;
            }
        }
        switch (item) {
            case 'In-play':
                return (inPlayEvents.length > 0 &&
                    <ScoreCardList
                        data={inPlayEvents}
                        renderItem={this.renderScoreCard}
                        ListHeaderComponent={() => this.renderHeader(item, true)}
                        key={index}
                    />
                )
            case 'Not Started':
                return (notStartedEvents.length > 0 &&
                    <ScoreCardList
                        data={notStartedEvents}
                        renderItem={this.renderScoreCard}
                        ListHeaderComponent={() => this.renderHeader(item, inPlayEvents.length == 0)}
                        key={index}
                    />
                )
            case 'Ended':
                return (endedEvents.length > 0 &&
                    <ScoreCardList
                        data={endedEvents}
                        renderItem={this.renderScoreCard}
                        ListHeaderComponent={() => this.renderHeader(item, notStartedEvents.length == 0 && inPlayEvents.length == 0)}
                        key={index}
                    />
                )
            case 'Others':
                return (otherEvents.length > 0 &&
                    <ScoreCardList
                        data={otherEvents}
                        renderItem={this.renderScoreCard}
                        ListHeaderComponent={() => this.renderHeader(item, notStartedEvents.length == 0 && inPlayEvents.length == 0 && endedEvents.length == 0)}
                        key={index}
                    />
                )
            default:
                return null;
        }
    }

    onDeleteCard = (card_id) => {
        Alert.alert(
            "Delete Score Card",
            "Are you sure you want to delete this card?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        deleteScoreCard(card_id)
                            .then(({ data }) => {
                                const { success, error } = data;
                                if (success) {
                                    this.getEventsData();
                                    Toast.show('Score Card deleted.');
                                } else {
                                    Toast.show(error);
                                }
                            })
                            .catch(() => {
                                Toast.show('Cannot delete card. Please try again later.')
                            })
                    },
                },
                { text: "No", },
            ]
        );
    }

    renderEmptyList = (addModalOpen) => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>The Score Card lets you track the</Text>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>progress of your bet. Click on +</Text>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>to add a game to your score card.</Text>
            <TouchableOpacity
                style={[styles.createButton]}
                onPress={addModalOpen}
            >
                <Text style={styles.buttonText}>+ Create Score Card</Text>
            </TouchableOpacity>
        </View>
    )

    getSnapshotBeforeUpdate(prevProps) {
        return { reloadRequired: prevProps.newlyAdded !== this.props.newlyAdded };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot.reloadRequired) {
            this.getEventsData();
        }
    }

    onRefresh = () => {
        this.getEventsData(false, true);
    }

    render() {
        const { data, loading, refreshing } = this.state;
        const { addModalOpen } = this.props;

        return (
            <ScrollView style={styles.container}
                contentContainerStyle={styles.contentContainer}
                refreshControl={<RefreshControl
                    colors={['#000']}
                    progressBackgroundColor="#FFF"
                    refreshing={refreshing}
                    onRefresh={this.onRefresh} />}>
                {loading && <LoadingIndicator style={styles.loadingIndicator} />}
                {!loading && (!data || !data.length) && this.renderEmptyList(addModalOpen)}
                {!loading && data && data.length > 0 && ['In-play', 'Not Started', 'Ended', 'Others'].map(this.renderScoreList)}
            </ScrollView>
        )
    }
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, null)(ScoreCardPerDayScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    contentContainer: {
        flexGrow: 1
    },
    loadingIndicator: {
        flex: 1,
    },
    list: {
        backgroundColor: '#121212',
        paddingBottom: 20,
        flex: 1,
    },
    listHeader: {
        marginVertical: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    listHeaderText: {
        fontSize: 12,
        color: '#FFF',
        fontWeight: 'bold'
    },
    floatingActionButtonStyle: {
        position: 'absolute',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 10,
        backgroundColor: '#666',
        shadowColor: 'white',
        shadowOpacity: 0.6,
        shadowOffset: { width: 5, height: 5 },
        borderRadius: 200 / 2
    },
    floatingActionButtonIconStyle: {
        width: 20,
        height: 20,
        tintColor: '#FFFFFF'
    },
    menuTitleTextStyle: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        paddingVertical: 4
    },
    menuTextStyle: {
        fontSize: 14,
        color: 'white',
        paddingVertical: 6
    },
    createButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        marginTop: 200
    },
    buttonText: {
        color: '#B90000',
        fontSize: 20
    }
});
