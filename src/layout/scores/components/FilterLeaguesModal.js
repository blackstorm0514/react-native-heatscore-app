import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Text } from '@ui-kitten/components'
import { LoadingIndicator } from './LoadingIndicator';
import { getLeagueList } from '../../../redux/services';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { actions } from '../../../redux/reducer';

const screenWidth = Dimensions.get('window').width;

const topLeagues = [
    {
        "league_id": 459,
        "name": "NFL",
        "sport": "American Football"
    },
    {
        "league_id": 2274,
        "name": "NBA",
        "sport": "Basketball"
    },
    {
        "league_id": 1926,
        "name": "NHL",
        "sport": "Ice Hockey"
    },
    {
        "league_id": 225,
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

class FilterLeaguesModal extends PureComponent {
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
        const { filterdLeagues, toggleFilteredLeagueAction } = this.props;
        let checked = true;
        if (filterdLeagues.length > 0 && filterdLeagues.find(league_id => league_id == item.league_id)) {
            checked = false;
        }
        return (
            <TouchableOpacity key={index} style={styles.topLeagueItem}
                activeOpacity={0.8}
                onPress={() => toggleFilteredLeagueAction(item.league_id)}>
                {getSportsIcon(item.sport)}
                <Text style={styles.topLeagueText}>{item.name}</Text>
                <MaterialIcons name={checked ? "check-box" : "check-box-outline-blank"}
                    size={14} color="white"
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
        const { filterdLeagues, toggleFilteredLeagueAction } = this.props;
        let checked = true;
        if (filterdLeagues.length > 0 && filterdLeagues.find(league_id => league_id == league.league_id)) {
            checked = false;
        }
        return (
            <TouchableOpacity key={index} style={styles.leagueItem}
                activeOpacity={0.8}
                onPress={() => toggleFilteredLeagueAction(league.league_id)}>
                <Text style={styles.topLeagueText}>{league.name}</Text>
                <MaterialIcons name={checked ? "check-box" : "check-box-outline-blank"}
                    size={14} color="white" style={styles.leagueCheckboxIcon} />
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

const mapStateToProps = (state) => ({
    filterdLeagues: state.filterdLeagues
});

export default connect(mapStateToProps, { toggleFilteredLeagueAction: actions.toggleFilteredLeagueAction })(FilterLeaguesModal);

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
