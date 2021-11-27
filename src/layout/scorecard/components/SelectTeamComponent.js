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
            selected: null,
        }
    }

    onSelectTeam = (team) => {
        this.setState({ selected: team });
    }

    render() {
        const { selected } = this.state;
        const { onBack } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={onBack}>
                        <FontAwesomeIcon
                            color='#fff'
                            size={24} name='angle-left' />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Select a team</Text>
                    <Text></Text>
                </View>
                <TouchableOpacity style={styles.radioContainer}
                    activeOpacity={0.7}
                    onPress={() => this.onSelectTeam('home')}>
                    <FontAwesomeIcon color='white' size={20}
                        name={selected == 'home' ? 'check-circle' : 'circle-thin'} />
                    <Image
                        style={styles.teamLogoImage}
                        source={{ uri: `https://assets.b365api.com/images/team/m/35.png` }}
                    />
                    <Text style={styles.selectItemTeamName} numberOfLines={1}>Home Team</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioContainer}
                    activeOpacity={0.7}
                    onPress={() => this.onSelectTeam('away')}>
                    <FontAwesomeIcon color='white' size={20}
                        name={selected == 'away' ? 'check-circle' : 'circle-thin'} />
                    <Image
                        style={styles.teamLogoImage}
                        source={{ uri: `https://assets.b365api.com/images/team/m/36.png` }}
                    />
                    <Text style={styles.selectItemTeamName} numberOfLines={1}>Away Team</Text>
                </TouchableOpacity>
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
})