import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import { Text } from '@ui-kitten/components'
import { LoadingIndicator } from './LoadingIndicator';
import { getLeagueList } from '../../../redux/services';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const topLeagues = [
    {
        "id": 459,
        "name": "NFL",
        "sport": "American Football"
    },
    {
        "id": 2274,
        "name": "NBA",
        "sport": "Basketball"
    },
    {
        "id": 1926,
        "name": "NHL",
        "sport": "Ice Hockey"
    },
    {
        "id": 225,
        "name": "MLB",
        "sport": "Baseball"
    }
];

const iconName = {
    "American Football": "sports-football",
    "Basketball": "sports-basketball",
    "Ice Hockey": "sports-hockey",
    "Baseball": "sports-baseball",
    "Soccer": "sports-soccer",
}

const getSportsIcon = (sport) => (
    <MaterialIcons name={iconName[sport]}
        size={14} color="white"
    />
)

export default class SelectLeaguesModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sports: []
        }
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
        this.getSportsList();
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    getSportsList = () => {
        this._Mounted && this.setState({ loading: true });
        getLeagueList()
            .then(({ data }) => {
                const { sports } = data;
                this._Mounted && this.setState({ loading: false, sports: sports });
            })
            .catch(() => {
                this._Mounted && this.setState({ loading: false, sports: [] });
            })
    }

    renderTopLeagueItem = (item, index) => {
        const { setLeague } = this.props;
        return (
            <TouchableOpacity key={index} style={styles.topLeagueItem}
                activeOpacity={0.8}
                onPress={() => setLeague(item)}>
                {getSportsIcon(item.sport)}
                <Text style={styles.topLeagueText}>{item.name}</Text>
                <MaterialIcons name="keyboard-arrow-right"
                    size={18} color="white"
                    style={styles.leagueCheckboxIcon} />
            </TouchableOpacity>
        )
    }

    renderBody = () => {
        const { sports } = this.state;
        return sports.length ? (
            <View style={styles.list}>
                <Text style={styles.titleText}>Top Leagues</Text>
                {topLeagues.map(this.renderTopLeagueItem)}
                <Text style={styles.titleText}>All Sports</Text>
                {sports.map(this.renderSportsItem)}
            </View>
        ) : (
            <View style={styles.list}>
                <Text style={styles.noDataText}>No Data Available.</Text>
            </View>
        )
    }

    renderSportsItem = (sport, index) => {
        return (
            <Collapse key={index}>
                <CollapseHeader style={styles.topLeagueItem}>
                    {getSportsIcon(sport._id)}
                    <Text style={styles.topLeagueText}>{sport._id}</Text>
                </CollapseHeader>
                <CollapseBody>
                    {sport.leagues.map(this.renderSportLeagueItem)}
                </CollapseBody>
            </Collapse>
        )
    }

    renderSportLeagueItem = (league, index) => {
        const { setLeague } = this.props;
        return (
            <TouchableOpacity key={index} style={styles.leagueItem}
                activeOpacity={0.8}
                onPress={() => setLeague(league)}>
                <Text style={styles.topLeagueText}>{league.name}</Text>
                <MaterialIcons name="keyboard-arrow-right"
                    size={18} color="white" style={styles.leagueCheckboxIcon} />
            </TouchableOpacity>
        )
    }

    render() {
        const { loading } = this.state;
        return (
            <View style={styles.container}>
                {loading && <LoadingIndicator style={styles.loadingIndicator} />}
                {!loading && this.renderBody()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingIndicator: {
        marginTop: 30
    },
    list: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    noDataText: {
        fontSize: 16,
        textAlign: 'center'
    },
    titleText: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
    },
    topLeagueItem: {
        borderColor: '#333',
        borderWidth: 2,
        marginTop: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        flexDirection: 'row'
    },
    leagueItem: {
        borderColor: '#333',
        borderBottomWidth: 1,
        marginTop: 2,
        paddingHorizontal: 10,
        marginLeft: 20,
        paddingVertical: 4,
        flexDirection: 'row'
    },
    topLeagueText: {
        fontSize: 12,
        marginLeft: 6,
    },
    leagueCheckboxIcon: {
        marginLeft: 'auto'
    }
});
