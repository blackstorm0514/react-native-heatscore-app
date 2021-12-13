import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ModalAction from "./ModalAction";

export default class SelectTeamComponent extends PureComponent {
    render() {
        const { event, type, team, onSelect } = this.props;
        if (!event) return null;
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>TEAM</Text>
                </View>
                {type != 'total' && <>
                    <TouchableOpacity style={styles.radioContainer}
                        activeOpacity={0.7}
                        onPress={() => onSelect('home')}>
                        <FontAwesomeIcon color='white' size={14}
                            name={team == 'home' ? 'check-circle' : 'circle-thin'} />
                        <Image
                            style={styles.teamLogoImage}
                            source={{ uri: `https://assets.b365api.com/images/team/m/${event.home.image_id}.png` }}
                        />
                        <Text style={styles.selectItemTeamName} numberOfLines={1}>{event.home.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.radioContainer}
                        activeOpacity={0.7}
                        onPress={() => onSelect('away')}>
                        <FontAwesomeIcon color='white' size={14}
                            name={team == 'away' ? 'check-circle' : 'circle-thin'} />
                        <Image
                            style={styles.teamLogoImage}
                            source={{ uri: `https://assets.b365api.com/images/team/m/${event.away.image_id}.png` }}
                        />
                        <Text style={styles.selectItemTeamName} numberOfLines={1}>{event.away.name}</Text>
                    </TouchableOpacity>
                </>}
                {type == 'total' && <>
                    <TouchableOpacity style={styles.radioContainer}
                        activeOpacity={0.7}
                        onPress={() => onSelect('home')}>
                        <FontAwesomeIcon color='white' size={14}
                            name={team == 'home' ? 'check-circle' : 'circle-thin'} />
                        <Text style={[styles.selectItemTeamName, styles.selectItemOverUnder]} numberOfLines={1}>Over</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.radioContainer}
                        activeOpacity={0.7}
                        onPress={() => onSelect('away')}>
                        <FontAwesomeIcon color='white' size={14}
                            name={team == 'away' ? 'check-circle' : 'circle-thin'} />
                        <Text style={[styles.selectItemTeamName, styles.selectItemOverUnder]} numberOfLines={1}>Under</Text>
                    </TouchableOpacity>
                </>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingVertical: 6,
        borderBottomColor: '#222',
        borderBottomWidth: 1,
    },
    titleContainer: {
        flexDirection: 'row',
    },
    titleText: {
        fontSize: 14,
    },
    radioContainer: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    teamLogoImage: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        marginLeft: 5
    },
    selectItemTeamName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5
    },
    selectItemOverUnder: {
        marginLeft: 5
    }
})