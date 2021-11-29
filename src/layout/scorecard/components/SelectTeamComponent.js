import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class SelectTeamComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            team: props.team ? props.team : null
        }
    }

    onBack = () => {
        const { onBack, onSelect } = this.props;
        const { team } = this.state;
        onSelect(team);
        onBack();
    }

    render() {
        const { event, type } = this.props;
        const { team } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={this.onBack}>
                        <FontAwesomeIcon
                            color='#fff'
                            size={24} name='angle-left' />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Select a team</Text>
                    <Text></Text>
                </View>
                {type != 'total' && <>
                    <TouchableOpacity style={styles.radioContainer}
                        activeOpacity={0.7}
                        onPress={() => this.setState({ team: 'home' })}>
                        <FontAwesomeIcon color='white' size={20}
                            name={team == 'home' ? 'check-circle' : 'circle-thin'} />
                        <Image
                            style={styles.teamLogoImage}
                            source={{ uri: `https://assets.b365api.com/images/team/m/${event.home.image_id}.png` }}
                        />
                        <Text style={styles.selectItemTeamName} numberOfLines={1}>{event.home.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.radioContainer}
                        activeOpacity={0.7}
                        onPress={() => this.setState({ team: 'away' })}>
                        <FontAwesomeIcon color='white' size={20}
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
                        onPress={() => this.setState({ team: 'home' })}>
                        <FontAwesomeIcon color='white' size={20}
                            name={team == 'home' ? 'check-circle' : 'circle-thin'} />
                        <Text style={[styles.selectItemTeamName, styles.selectItemOverUnder]} numberOfLines={1}>Over</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.radioContainer}
                        activeOpacity={0.7}
                        onPress={() => this.setState({ team: 'away' })}>
                        <FontAwesomeIcon color='white' size={20}
                            name={team == 'away' ? 'check-circle' : 'circle-thin'} />
                        <Text style={[styles.selectItemTeamName, styles.selectItemOverUnder]} numberOfLines={1}>Under</Text>
                    </TouchableOpacity>
                </>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    titleText: {
        fontSize: 20,
    },
    radioContainer: {
        borderColor: '#222',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center'
    },
    teamLogoImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        flex: 1
    },
    selectItemTeamName: {
        flex: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectItemOverUnder: {
        marginLeft: 16
    }
})