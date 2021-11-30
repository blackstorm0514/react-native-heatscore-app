import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Button, Text, List } from '@ui-kitten/components';
import RenderEventComponent from './RenderEventComponent';

const screenWidth = Dimensions.get('window').width;

export default class LeaguesListComponent extends PureComponent {

    renderLeagueHeader = () => {
        const { setLeague, league, seeRounds } = this.props;

        return (
            <View style={styles.leagueTitle}>
                <Text style={styles.leagueTitleText} numberOfLines={1}>{league.name} - {league.sport.name}</Text>
                {setLeague &&
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => setLeague({ name: league.name, id: league.league_id })}>
                        <Text style={styles.seeAllLeagueButton}>SEE ALL</Text>
                    </TouchableOpacity>
                }
                {seeRounds &&
                    <TouchableOpacity activeOpacity={0.8} onPress={() => seeRounds()}>
                        <Text style={styles.seeAllLeagueButton}>SEE ROUNDS</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    renderEvent = ({ item }) => {
        const { navigation } = this.props;
        return (
            <RenderEventComponent event={item} key={item.event_id}
                navigation={navigation} />
        )
    }

    renderEmptyList = () => (
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 16, marginTop: 20 }}>There are no events.</Text>
        </View>
    )

    render() {
        const { league } = this.props;

        return (
            <FlatList
                style={styles.leagueContainer}
                data={league.events ? league.events : []}
                renderItem={this.renderEvent}
                keyExtractor={(item) => item.event_id.toString()}
                ListHeaderComponent={this.renderLeagueHeader}
                ListEmptyComponent={this.renderEmptyList}
            />
        )
    }
}

const styles = StyleSheet.create({
    leagueContainer: {
        // paddingBottom: 15,
        backgroundColor: 'black'
    },
    leagueTitle: {
        backgroundColor: '#222',
        paddingVertical: 2,
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderBottomColor: '#888',
        borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: screenWidth
    },
    leagueTitleText: {
        color: 'white',
        fontWeight: 'bold',
        paddingVertical: 2,
        maxWidth: '70%',
        fontSize: 14
    },
    seeAllLeagueButton: {
        textTransform: 'uppercase',
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },
});
