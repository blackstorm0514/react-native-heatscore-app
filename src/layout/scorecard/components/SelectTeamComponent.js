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
    constructor(props) {
        super(props);
        this.state = {
            team: props.team ? props.team : null
        }
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    render() {
        const { event, type, onNext, onBack } = this.props;
        const { team } = this.state;

        if (!event) return null;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Select a team</Text>
                </View>
                {type != 'total' && <>
                    <TouchableOpacity style={styles.radioContainer}
                        activeOpacity={0.7}
                        onPress={() => this._Mounted && this.setState({ team: 'home' })}>
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
                        onPress={() => this._Mounted && this.setState({ team: 'away' })}>
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
                        onPress={() => this._Mounted && this.setState({ team: 'home' })}>
                        <FontAwesomeIcon color='white' size={20}
                            name={team == 'home' ? 'check-circle' : 'circle-thin'} />
                        <Text style={[styles.selectItemTeamName, styles.selectItemOverUnder]} numberOfLines={1}>Over</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.radioContainer}
                        activeOpacity={0.7}
                        onPress={() => this._Mounted && this.setState({ team: 'away' })}>
                        <FontAwesomeIcon color='white' size={20}
                            name={team == 'away' ? 'check-circle' : 'circle-thin'} />
                        <Text style={[styles.selectItemTeamName, styles.selectItemOverUnder]} numberOfLines={1}>Under</Text>
                    </TouchableOpacity>
                </>}

                <ModalAction
                    onNext={() => onNext(team)}
                    onBack={onBack} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    titleText: {
        fontSize: 16,
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