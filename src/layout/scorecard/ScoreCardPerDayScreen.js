import React, { PureComponent } from 'react';
import { Alert, FlatList, StyleSheet, View, } from 'react-native';
import { Text } from '@ui-kitten/components';
import { RefreshIcon } from '../../libs/icons';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { LoadingIndicator } from '../scores/components/LoadingIndicator';
import ScoreCardComponent from './components/ScoreCardComponent';
import { getScoreCards } from '../../redux/services';

class ScoreCardPerDayScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
        }
    }

    componentDidMount() {
        this.getEventsData();
    }

    getEventsData = () => {
        const { date } = this.props;
        const { loading } = this.state;
        if (loading) return;
        this.setState({ loading: true });
        getScoreCards(date)
            .then(({ data: result }) => {
                const { success, data: score_cards, error } = result;
                if (success) {
                    this.setState({ data: score_cards, loading: false });
                } else {
                    this.setState({ data: [], loading: false });
                }
            })
            .catch(() => {
                this.setState({ loading: false, data: [] });
            });
    }

    renderHeader = (item) => {
        return (
            <View style={styles.listHeader}>
                <Text>{item}</Text>
            </View>
        );
    }

    renderScoreCard = ({ item }) => {
        return (
            <ScoreCardComponent
                card={item}
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
        marginHorizontal: 20
    },
    floatingActionButtonStyle: {
        position: 'absolute',
        width: 40,
        height: 40,
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
        width: 30,
        height: 30,
        tintColor: '#FFFFFF'
    },
});
