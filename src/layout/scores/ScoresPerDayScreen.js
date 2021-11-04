import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Button, Text, List } from '@ui-kitten/components';
import { PlusOutlineIcon, RefreshIcon } from '../../components/icons';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import LeaguesListComponent from './components/LeaguesListComponent';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { actions } from '../../redux/reducer';

const ScoresPerDayScreen = ({ date, navigation, keyDate, events, getEventAction }) => {
    let event = events.find(event => event.key == keyDate);
    if (!event) {
        return null;
    }
    const { data, loading, favorites, key } = event;

    const getEventsData = () => {
        getEventAction(keyDate);
    }

    const renderFavorite = () => (
        <View style={styles.titleContainer}>
            <View style={styles.favoriteTitle}>
                <Text style={styles.favoriteTitleText}>Favorite</Text>
                <Button style={styles.addFavoriteButton}
                    appearance='ghost'
                    status='danger'
                    size='medium'
                    accessoryLeft={PlusOutlineIcon} />
            </View>
            <Text style={styles.addFavoriteText}>Add Favorites</Text>
        </View>
    )

    const renderLeagues = ({ item }) => {
        return <LeaguesListComponent league={item} navigation={navigation} />
    }

    const onFloatinActionClick = () => {
        getEventsData();
    };

    return (
        <View style={styles.container}>
            <OrientationLoadingOverlay
                visible={loading}
                color="white"
                indicatorSize="large"
                messageFontSize={24}
                message="Loading..."
            />
            <List
                style={styles.list}
                data={data ? data : []}
                renderItem={renderLeagues}
                ListHeaderComponent={renderFavorite}
            />
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onFloatinActionClick}
                style={styles.floatingActionButtonStyle}>
                <RefreshIcon
                    style={styles.floatingActionButtonIconStyle}
                />
            </TouchableOpacity>
        </View>
    )
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
    list: {
        backgroundColor: 'black',
        paddingBottom: 20
    },
    titleContainer: {
        paddingBottom: 15
    },
    favoriteTitle: {
        backgroundColor: '#222',
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#888',
        borderBottomWidth: 2
    },
    favoriteTitleText: {
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingTop: 10
    },
    addFavoriteButton: {
        width: 20,
        height: 20,
        alignSelf: 'flex-end'
    },
    addFavoriteText: {
        color: 'white',
        textTransform: 'uppercase',
        alignSelf: 'center',
        marginTop: 15,
        fontWeight: 'bold'
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
