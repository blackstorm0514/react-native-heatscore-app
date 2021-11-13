import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity
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
            <RenderEventComponent event={item}
                navigation={navigation} />
        )
    }

    render() {
        const { league } = this.props;

        if (!league.events || !league.events.length) return null;
        return (
            <List
                style={styles.leagueContainer}
                data={league.events ? league.events : []}
                renderItem={this.renderEvent}
                ListHeaderComponent={this.renderLeagueHeader}
            />
        )
    }
}

const styles = StyleSheet.create({
    leagueContainer: {
        paddingBottom: 15,
        backgroundColor: 'black'
    },
    leagueTitle: {
        backgroundColor: '#222',
        paddingVertical: 5,
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
        paddingVertical: 10,
        maxWidth: '70%'
    },
    seeAllLeagueButton: {
        textTransform: 'uppercase',
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },
});
