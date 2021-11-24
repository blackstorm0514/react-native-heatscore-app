import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, View, } from 'react-native';
import { Text } from '@ui-kitten/components';
import { RefreshIcon } from '../../components/icons';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { LoadingIndicator } from '../scores/components/LoadingIndicator';
import ScoreCardComponent from './components/ScoreCardComponent';

class ScoreCardPerDayScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [1],
        }
    }

    componentDidMount() {
        this.getEventsData();
    }

    getEventsData = () => {
        const { date } = this.props;

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
            <ScoreCardComponent event={item} />
        )
    }

    renderScoreList = ({ item }) => {
        const { data } = this.state;
        switch (item) {
            case 'Not Started':
                return (
                    <FlatList
                        data={[1, 2, 1]}
                        renderItem={this.renderScoreCard}
                        ListHeaderComponent={() => this.renderHeader(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )
            case 'In-play':
                return (
                    <FlatList
                        data={[1, 2, 1]}
                        renderItem={this.renderScoreCard}
                        ListHeaderComponent={() => this.renderHeader(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )
            case 'Ended':
                return (
                    <FlatList
                        data={[1, 2, 1]}
                        renderItem={this.renderScoreCard}
                        ListHeaderComponent={() => this.renderHeader(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )
            default:
                return null;
        }
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
                    data={data && data.length ? ['Not Started', 'In-play', 'Ended'] : []}
                    renderItem={this.renderScoreList}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={this.renderEmptyList}
                />}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.onFloatinActionClick}
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
