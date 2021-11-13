import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Button, Text, List } from '@ui-kitten/components';
import RenderEventComponent from './RenderEventComponent';

export default class LeaguesListComponent extends PureComponent {

    renderLeagueHeader = () => {
        const { setLeague, league, seeRounds } = this.props;

        return (
            <View style={styles.leagueTitle}>
                <Text style={styles.leagueTitleText}>{league.name} - {league.sport.name}</Text>
                {setLeague && <Button style={styles.seeAllLeagueButton}
                    size='medium'
                    onPress={() => setLeague({ name: league.name, id: league.league_id })}>
                    SEE ALL
                </Button>}
                {seeRounds && <Button style={styles.seeAllLeagueButton}
                    size='medium'
                    onPress={() => seeRounds()}>
                    SEE ROUNDS
                </Button>}
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
        justifyContent: 'space-between',
        borderBottomColor: '#888',
        borderBottomWidth: 2
    },
    leagueTitleText: {
        color: 'white',
        fontWeight: 'bold',
        paddingVertical: 10
    },
    seeAllLeagueButton: {
        alignSelf: 'flex-end',
        textTransform: 'uppercase',
        color: 'white',
        backgroundColor: '#222',
        borderColor: '#222',
        borderRadius: 0
    },
});
