import React, { PureComponent } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image } from 'react-native';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('screen').width;

export default class ScoreCardComponent extends PureComponent {
    render() {
        const { event } = this.props;
        return (
            <ScrollView
                horizontal={true}
                style={styles.container}
                showsHorizontalScrollIndicator={false}
            >
                <View style={[styles.eventWrapper, event % 2 ? styles.winContainer : styles.lossContainer]}>
                    <Text style={styles.eventPickText}>Home Team + 6.5</Text>
                    <View style={styles.eventContainer}>
                        <View style={styles.eventItemDetail}>
                            <View style={styles.eventItemTeam}>
                                <Image
                                    style={styles.teamLogoImage}
                                    source={{ uri: `https://assets.b365api.com/images/team/m/32.png` }}
                                />
                                <Text style={styles.eventItemTeamName} numberOfLines={1}>Home Team</Text>
                                <Text style={styles.eventItemTeamScore}>4</Text>
                            </View>
                            <View style={styles.eventItemTeam}>
                                <Image
                                    style={styles.teamLogoImage}
                                    source={{ uri: `https://assets.b365api.com/images/team/m/42.png` }}
                                />
                                <Text style={styles.eventItemTeamName} numberOfLines={1}>Away Team</Text>
                                <Text style={styles.eventItemTeamScore}>3</Text>
                            </View>
                        </View>
                        <View style={styles.eventItemStatus}>
                            <Text style={styles.eventItemStatusText}>13:80 AM</Text>
                            <Text style={styles.eventItemStatusText} numberOfLines={1}>Ended</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.deleteButtonContainer} activeOpacity={0.8}>
                    <FontAwesomeIcon name='trash' size={32} color='white' />
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 4,
    },
    eventWrapper: {
        borderLeftWidth: 4,
    },
    winContainer: {
        borderLeftColor: 'green'
    },
    lossContainer: {
        borderLeftColor: 'red'
    },
    eventPickText: {
        color: 'white',
        marginLeft: 15
    },
    eventContainer: {
        width: screenWidth,
        flexDirection: 'row',
    },
    deleteButtonContainer: {
        backgroundColor: 'red',
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventItemDetail: {
        flex: 5,
    },
    eventItemTeam: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4
    },
    teamLogoImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        flex: 1
    },
    eventItemTeamName: {
        flex: 5,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20
    },
    eventItemTeamScore: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold'
    },
    eventItemStatus: {
        flex: 2,
        justifyContent: 'center',
        paddingRight: 8,
    },
    eventItemStatusText: {
        fontSize: 16,
        marginVertical: 8,
        textAlign: 'right',
        overflow: 'hidden'
    },
})