import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Button, Text, List } from '@ui-kitten/components';
import { PlusOutlineIcon } from '../../components/icons';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import { ApiService } from '../../services/api.service';
import LeaguesListComponent from './components/LeaguesListComponent';

export default ({ date, navigation }) => {
    let newDate = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    newDate = new Date(year, month, day);

    const [favorites, setFavorites] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getEventsData();
    }, [date]);

    const getEventsData = () => {
        setLoading(true);
        ApiService.get('/events', { params: { date: newDate } })
            .then(({ data: result }) => {
                const { favorites, data } = result;
                // console.log(data)
                setLoading(false);
                setFavorites(favorites);
                setData(data);
            })
            .catch((error) => {
                // console.log(error);
                setLoading(false);
                setFavorites(null);
                setData(null);
            })
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

    const onScroll = ({ nativeEvent }) => {
        if (nativeEvent.contentOffset.y == 0 && loading == false) {
            // getEventsData();
        }
    }

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
                onScroll={onScroll}
            />
        </View>
    )
};

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
});
