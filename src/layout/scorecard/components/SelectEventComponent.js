import React, { createRef, PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { Text, RangeDatepicker, Select, SelectItem, Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { CalendarIcon } from "../../../libs/icons";
import { getEventsForLeague, getLeaguesForSport } from "../../../redux/services";
import { format } from 'date-fns';
import Toast from 'react-native-simple-toast';

const sports = [
    { title: 'Soccer', id: 1 },
    { title: 'American Football', id: 12 },
    { title: 'Basketball', id: 18 },
    { title: 'Baseball', id: 16 },
    { title: 'Ice Hockey', id: 17 },
]

export default class SelectEventComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            daterange: {},
            sport: null,
            league: null,
            event: null,
            leagueQuery: '',
            leagues: [],
            leagueTypingTimeout: null,
            eventQuery: '',
            events: [],
            eventTypingTimeout: null,
        }
        this.leagueInput = createRef();
        this.eventInput = createRef();
    }

    onSelectDateRange = (daterange) => {
        this.setState({
            daterange,
            eventQuery: '',
            event: null,
            events: []
        });
    }

    onSelectSport = async (index) => {
        const { sport } = this.state;
        if (!sport || sport.row != index.row) {
            await this.setState({
                sport: index,
                league: null,
                leagueQuery: '',
            });
        }
    }

    onChangeLeagueText = async (text) => {
        const { leagueTypingTimeout } = this.state;
        if (leagueTypingTimeout) {
            clearTimeout(leagueTypingTimeout);
        }
        this.setState({
            leagueQuery: text,
            leagueTypingTimeout: setTimeout(this.getLeaguesForSport, 500),
            league: null,
        });
    }

    getLeaguesForSport = () => {
        const { leagueQuery, sport: sportIndex } = this.state;
        if (!sportIndex) return;

        const sport = sports[sportIndex.row].id;
        this.setState({
            leagues: [],
            eventQuery: '',
            event: null,
            events: []
        });
        getLeaguesForSport(sport, leagueQuery)
            .then(({ data }) => {
                const { success, leagues } = data;
                if (success) {
                    this.setState({ leagues: leagues });
                } else {
                    this.setState({ leagues: [] });
                }
            })
            .catch(() => {
                this.setState({ leagues: [] });
            })
    }

    onSelectLeague = async (item) => {
        const { leagues } = this.state;
        if (leagues.length == 0) return;
        this.leagueInput.current?.blur();
        await this.setState({
            leagueQuery: leagues[item].name,
            league: leagues[item].league_id,
        });
    }

    onChangeEventText = (text) => {
        const { eventTypingTimeout } = this.state;
        if (eventTypingTimeout) {
            clearTimeout(eventTypingTimeout);
        }
        this.setState({
            eventQuery: text,
            eventTypingTimeout: setTimeout(this.getEventsForLeague, 500),
            event: null,
        });
    }

    getEventsForLeague = () => {
        const { league, sport: sportIndex, eventQuery, daterange } = this.state;
        if (!sportIndex || !league) return;
        this.setState({
            events: [],
            event: null,
            eventQuery: ''
        });
        getEventsForLeague(league, eventQuery, daterange.startDate, daterange.endDate)
            .then(({ data }) => {
                const { success, events } = data;
                if (success) {
                    this.setState({ events: events });
                } else {
                    this.setState({ events: [] });
                }
            })
            .catch(() => {
                this.setState({ events: [] });
            })
    }

    onSelectEvent = (item) => {
        const { events } = this.state;
        if (events.length == 0) return;
        this.eventInput.current?.blur();
        this.setState({
            eventQuery: `${events[item].home.name} vs ${events[item].away.name}`,
            event: events[item],
        });
    }

    renderSportsOption = (item) => (
        <SelectItem title={item.title} key={item.title} />
    );

    renderLeaguesOption = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.name}
            style={styles.autocompleteItem}
            activeOpacity={0.7}
        />
    );

    getFormattedDate = (date) => {
        return format(new Date(date), "eee MMM dd, HH:mm aa");
    }

    renderEventsOption = (item, index) => (
        <AutocompleteItem key={index}
            style={styles.autocompleteItem}
            activeOpacity={0.7}>
            <View>
                <View style={styles.autocompleteEventContainer}>
                    <Image
                        style={styles.teamLogoImage}
                        source={{ uri: `https://assets.b365api.com/images/team/m/${item.home.image_id}.png` }}
                    />
                    <Text style={styles.autocompleteEventText}>{item.home.name} vs {item.away.name}</Text>
                    <Image
                        style={styles.teamLogoImage}
                        source={{ uri: `https://assets.b365api.com/images/team/m/${item.away.image_id}.png` }}
                    />
                </View>
                <Text style={styles.eventTimeText}>{this.getFormattedDate(item.time)}</Text>
            </View>
        </AutocompleteItem>
    );

    handleOK = () => {
        const { event } = this.state;
        const { onSelect } = this.props;
        if (!event) {
            Toast.show('Please select an event to add Score Card.');
            return;
        }
        onSelect(event);
    }

    render() {
        const { onBack } = this.props;
        const { daterange, sport, events, eventQuery, leagueQuery, leagues } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={onBack}>
                        <FontAwesomeIcon
                            color='#fff'
                            size={24} name='angle-left' />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Select an event.</Text>
                    <Text></Text>
                </View>
                <View style={styles.formContainer}>
                    <RangeDatepicker
                        range={daterange}
                        onSelect={this.onSelectDateRange}
                        accessoryRight={CalendarIcon}
                        label="Select Date Range"
                        style={styles.rangePickerStyle}
                        controlStyle={styles.rangePickerControlStyle}
                    />
                    <Select
                        label="Select a Sport"
                        style={styles.selectSport}
                        placeholder='Select a Sport'
                        value={sport ? sports[sport.row].title : ''}
                        selectedIndex={sport}
                        onSelect={this.onSelectSport}
                    >
                        {sports.map(this.renderSportsOption)}
                    </Select>

                    <Autocomplete
                        placeholder='Select a League'
                        style={styles.selectSport}
                        label='Select a League'
                        value={leagueQuery}
                        onSelect={this.onSelectLeague}
                        onChangeText={this.onChangeLeagueText}
                        onFocus={this.getLeaguesForSport}
                        ref={this.leagueInput}
                    >
                        {leagues.length > 0 && leagues.map(this.renderLeaguesOption)}
                        {leagues.length == 0 && <AutocompleteItem
                            title="No Leagues."
                            style={styles.autocompleteItem}
                        />}
                    </Autocomplete>

                    <Autocomplete
                        placeholder='Search Event'
                        style={styles.selectSport}
                        label='Search Event'
                        value={eventQuery}
                        onSelect={this.onSelectEvent}
                        onChangeText={this.onChangeEventText}
                        onFocus={this.getEventsForLeague}
                        ref={this.eventInput}
                    >
                        {events.map(this.renderEventsOption)}
                        {events.length == 0 && <AutocompleteItem
                            title="No Events."
                            style={styles.autocompleteItem}
                        />}
                    </Autocomplete>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={this.handleOK}
                            activeOpacity={0.7}
                            style={[styles.buttonStyle, styles.buttonOK]}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onBack}
                            activeOpacity={0.7}
                            style={[styles.buttonStyle, styles.buttonCancel]}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    formContainer: {
        paddingHorizontal: 10
    },
    rangePickerStyle: {
        // backgroundColor: '#000'
        color: 'white'
    },
    rangePickerControlStyle: {
        backgroundColor: '#000',
        borderWidth: 0,
        color: 'white'
    },
    selectSport: {
        marginTop: 6
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,
    },
    buttonStyle: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 4
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16
    },
    buttonOK: {
        backgroundColor: '#E10032',
    },
    buttonCancel: {
        backgroundColor: '#333',
        marginLeft: 10
    },
    autocompleteItem: {
        color: '#FFF',
        backgroundColor: '#000'
    },
    autocompleteEventContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    teamLogoImage: {
        width: 16,
        height: 16,
        marginLeft: 10
    },
    autocompleteEventText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#FFF'
    },
    eventTimeText: {
        fontSize: 12,
        marginLeft: 10,
        color: '#999'
    }
})