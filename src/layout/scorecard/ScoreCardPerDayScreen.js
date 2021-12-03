import React, { PureComponent } from 'react';
import { Alert, FlatList, StyleSheet, View, } from 'react-native';
import { Text } from '@ui-kitten/components';
import { RefreshIcon } from '../../libs/icons';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { LoadingIndicator } from '../scores/components/LoadingIndicator';
import ScoreCardComponent from './components/ScoreCardComponent';
import { deleteScoreCard, getScoreCards } from '../../redux/services';
import Toast from 'react-native-simple-toast';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Menu, MenuItem, MenuDivider } from '../../components/menu';

class ScoreCardPerDayScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            showMenu: false,
            showMode: 'basic',
        }
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
        this.getEventsData();
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    getEventsData = () => {
        const { date } = this.props;
        const { loading } = this.state;
        if (loading) return;
        this._Mounted && this.setState({ loading: true });
        getScoreCards(date)
            .then(({ data: result }) => {
                const { success, data: score_cards, error } = result;
                if (success) {
                    this._Mounted && this.setState({ data: score_cards, loading: false });
                } else {
                    this._Mounted && this.setState({ data: [], loading: false });
                }
            })
            .catch(() => {
                this._Mounted && this.setState({ loading: false, data: [] });
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

    renderHeader = (item) => {
        const { showMenu } = this.state;
        return (
            <View style={styles.listHeader}>
                <Text style={styles.listHeaderText}>{item}</Text>
                {item == "In-play" &&
                    <View>
                        <Menu
                            visible={showMenu}
                            style={{ alignSelf: 'flex-end', backgroundColor: '#222' }}
                            anchor={<TouchableOpacity activeOpacity={0.8}
                                onPress={this.onShowMenu}>
                                <EntypoIcon name="dots-three-vertical"
                                    size={14} color="white" />
                            </TouchableOpacity>}
                            onRequestClose={this.onHideMenu}
                        >
                            <MenuItem disabled textStyle={styles.menuTitleTextStyle}>Actions</MenuItem>
                            <MenuDivider color="#555" />
                            <MenuItem onPress={() => this.onPressViewMode('basic')} textStyle={styles.menuTextStyle}>Basic View</MenuItem>
                            <MenuItem onPress={() => this.onPressViewMode('total')} textStyle={styles.menuTextStyle}>Total View</MenuItem>
                        </Menu>
                    </View>}
            </View>
        );
    }

    renderScoreCard = ({ item }) => {
        const { showMode } = this.state;
        return (
            <ScoreCardComponent
                card={item}
                showMode={showMode}
                onDeleteCard={this.onDeleteCard}
            />
        )
    }

    renderScoreList = ({ item }) => {
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
            case 'Not Started':
                return (notStartedEvents.length > 0 &&
                    <FlatList
                        data={notStartedEvents}
                        renderItem={this.renderScoreCard}
                        ListHeaderComponent={() => this.renderHeader(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )
            case 'In-play':
                return (inPlayEvents.length > 0 &&
                    <FlatList
                        data={inPlayEvents}
                        renderItem={this.renderScoreCard}
                        ListHeaderComponent={() => this.renderHeader(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )
            case 'Ended':
                return (endedEvents.length > 0 &&
                    <FlatList
                        data={endedEvents}
                        renderItem={this.renderScoreCard}
                        ListHeaderComponent={() => this.renderHeader(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )
            case 'Others':
                return (otherEvents.length > 0 &&
                    <FlatList
                        data={[]}
                        renderItem={this.renderScoreCard}
                        ListHeaderComponent={() => this.renderHeader(item)}
                        keyExtractor={(item, index) => index.toString()}
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

    renderEmptyList = () => (
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 16, marginTop: 20, textAlign: 'center' }}>Please Click + to add a game to your score card.</Text>
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

    render() {
        const { data, loading } = this.state;

        return (
            <View style={styles.container}>
                {loading && <LoadingIndicator style={styles.loadingIndicator} />}
                {!loading && <FlatList
                    style={styles.list}
                    data={data && data.length ? ['Not Started', 'In-play', 'Ended', 'Others'] : []}
                    renderItem={this.renderScoreList}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={this.renderEmptyList}
                />}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.getEventsData}
                    style={styles.floatingActionButtonStyle}>
                    <RefreshIcon
                        style={styles.floatingActionButtonIconStyle}
                    />
                </TouchableOpacity>
            </View>
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
        backgroundColor: 'black'
    },
    loadingIndicator: {
        flex: 1
    },
    list: {
        backgroundColor: 'black',
        paddingBottom: 20
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
    }
});
