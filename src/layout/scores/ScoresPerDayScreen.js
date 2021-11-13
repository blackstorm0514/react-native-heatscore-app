import React, { Component, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Button, Text, List } from '@ui-kitten/components';
import { PlusOutlineIcon, RefreshIcon } from '../../components/icons';
import LeaguesListComponent from './components/LeaguesListComponent';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { actions } from '../../redux/reducer';
import { LoadingIndicator } from './components/LoadingIndicator';
import RenderFavoriteComponent from './components/RenderFavoriteComponent';

class ScoresPerDayScreen extends Component {
    getEventsData = () => {
        const { getEventAction, keyDate } = this.props;
        getEventAction(keyDate);
    }

    renderFavorite = (favorites) => (
        favorites ? <RenderFavoriteComponent favorites={favorites} /> : null
    )

    renderLeagues = ({ item }) => {
        const { setLeague, navigation } = this.props;
        return <LeaguesListComponent
            league={item}
            setLeague={setLeague}
            navigation={navigation} />
    }

    onFloatinActionClick = () => {
        this.getEventsData();
    };

    render() {
        const { keyDate, events } = this.props;
        let event = events.find(event => event.key == keyDate);
        if (!event) {
            return null;
        }
        const { data, loading, favorites, key } = event;

        return (
            <View style={styles.container}>
                {loading && <LoadingIndicator style={styles.loadingIndicator} />}
                {!loading && <List
                    style={styles.list}
                    data={data ? data : []}
                    renderItem={this.renderLeagues}
                    ListHeaderComponent={() => this.renderFavorite(favorites)}
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
    events: state.events
});

export default connect(mapStateToProps, ({ getEventAction: actions.getEventAction }))(ScoresPerDayScreen);

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
