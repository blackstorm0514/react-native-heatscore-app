import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Text } from '@ui-kitten/components';
import RenderEventComponent from './RenderEventComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;
const iconName = {
    "American Football": "sports-football",
    "Basketball": "sports-basketball",
    "Ice Hockey": "sports-hockey",
    "Baseball": "sports-baseball",
    "Soccer": "sports-soccer",
}

const getSportsIcon = (sport) => (
    <MaterialIcons name={iconName[sport]}
        size={16} color="white"
    />
)

export default class LeaguesListComponent extends PureComponent {
    renderLeagueHeader = () => {
        const { league, seeRounds } = this.props;

        return (
            <View style={styles.leagueTitle}>
                {getSportsIcon(league.sport.name)}<Text style={styles.leagueTitleText} numberOfLines={1}> {league.name}</Text>
                {seeRounds &&
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => seeRounds()}
                        style={styles.seeRoundBotton}>
                        <Text style={styles.seeRoundText}>SEE ROUNDS</Text>
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
        backgroundColor: 'black'
    },
    leagueTitle: {
        backgroundColor: '#222',
        paddingVertical: 4,
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderBottomColor: '#888',
        borderBottomWidth: 2,
        width: screenWidth,
        alignItems: 'center'
    },
    leagueTitleText: {
        color: 'white',
        fontWeight: 'bold',
        maxWidth: '70%',
        fontSize: 14,
        marginLeft: 5
    },
    seeRoundBotton: {
        marginLeft: 'auto'
    },
    seeRoundText: {
        textTransform: 'uppercase',
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
