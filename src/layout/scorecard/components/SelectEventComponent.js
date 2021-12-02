import React, { createRef, PureComponent } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import { Text, Input, Button, List } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns';
import Toast from 'react-native-simple-toast';
import { CloseIcon, SearchIcon } from '../../../libs/icons';
import { LoadingIndicator } from '../../scores/components/LoadingIndicator';
import { searchEventsForScoreCard } from "../../../redux/services";
import { truncateString } from "../../../libs/functions";

const screenHeight = Dimensions.get('screen').height;

export default class SelectEventComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            loading: false,
            events: [],
            selectedEvent: null,
            searchTimeout: null
        }
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    handleOK = () => {
        const { selectedEvent } = this.state;
        const { onSelect } = this.props;
        if (!selectedEvent) {
            Toast.show('Please select an event to add Score Card.');
            return;
        }
        onSelect(selectedEvent);
    }

    onChangeText = (search) => {
        this._Mounted && this.setState({ search });
        if (search) {
            const { searchTimeout } = this.state;
            if (searchTimeout) clearTimeout(searchTimeout);
            this._Mounted && this.setState({ searchTimeout: setTimeout(this.searchEvents, 500) })
        }
    }

    searchEvents = () => {
        const { search } = this.state;
        this._Mounted && this.setState({ loading: true });
        searchEventsForScoreCard(search)
            .then(({ data }) => {
                const { success, events } = data;
                if (success) {
                    this._Mounted && this.setState({ loading: false, events: events });
                } else {
                    // Toast.show(error);
                    this._Mounted && this.setState({ loading: false, events: [] });
                }
            })
            .catch((error) => {
                // Toast.show('Cannot get events. Please try again later.');
                this._Mounted && this.setState({ loading: false, events: [] });
            })
    }

    customSearchIcon = () => {
        return <SearchIcon style={styles.searchIcon} />
    }

    customClearIcon = () => {
        const { search } = this.state;
        return search ? <TouchableOpacity activeOpacity={0.8} onPress={() => this._Mounted && this.setState({ search: '' })}>
            <CloseIcon style={styles.searchIcon} />
        </TouchableOpacity> : null
    }

    renderEvents = () => {
        const { loading, events, selectedEvent } = this.state;

        if (loading) {
            return (
                <LoadingIndicator style={styles.loadingIndicator} />
            )
        }
        if (events.length == 0) {
            return (
                <View style={styles.eventItem}>
                    <Text style={styles.noResultText}>No Result. Please retry with another terms.</Text>
                </View>
            )
        }

        return (
            <ScrollView style={styles.eventsContainer}>
                {events.map((event, index) => {
                    const selected = selectedEvent && selectedEvent.event_id == event.event_id;
                    return (
                        <View style={styles.eventItem} key={index}>
                            <TouchableOpacity
                                style={styles.eventItemDetail}
                                activeOpacity={selected ? 1 : 0.8}
                                onPress={() => this._Mounted && this.setState({ selectedEvent: event })}>
                                <Text style={styles.eventItemLeague}>{event.league.name}</Text>
                                <View style={styles.eventItemTeams}>
                                    <Image
                                        style={styles.teamLogoImage}
                                        source={{ uri: `https://assets.b365api.com/images/team/m/${event.home.image_id}.png` }}
                                    />
                                    <Text style={styles.eventItemTeamName}>{truncateString(event.home.name)} VS {truncateString(event.away.name)}</Text>
                                    <Image
                                        style={styles.teamLogoImage}
                                        source={{ uri: `https://assets.b365api.com/images/team/m/${event.away.image_id}.png` }}
                                    />
                                </View>
                                <Text style={styles.eventItemDate}>{format(new Date(event.time), "eee yyyy MMM dd, HH:mm aa")}</Text>
                            </TouchableOpacity>
                            {selected && <View style={styles.buttonsContainer}>
                                <TouchableOpacity
                                    onPress={this.handleOK}
                                    activeOpacity={0.7}
                                    style={[styles.buttonStyle, styles.buttonOK]}>
                                    <Text style={styles.buttonText}>OK</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this._Mounted && this.setState({ selectedEvent: null })}
                                    activeOpacity={0.7}
                                    style={[styles.buttonStyle, styles.buttonCancel]}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>}
                        </View>
                    )
                })}
            </ScrollView>
        );
    }

    render() {
        const { onBack } = this.props;
        const { search } = this.state;

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
                <View style={styles.header}>
                    <Input
                        style={styles.searchInput}
                        placeholder='Search Events'
                        placeholderTextColor="#888"
                        value={search}
                        onChangeText={this.onChangeText}
                        accessoryLeft={this.customSearchIcon}
                        accessoryRight={this.customClearIcon}
                    />
                </View>
                {this.renderEvents()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingTop: 10,
        paddingHorizontal: 10,
        height: 30,
    },
    titleText: {
        fontSize: 16,
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 2,
        backgroundColor: '#111',
    },
    searchInput: {
        marginTop: 6,
        backgroundColor: '#000',
        borderWidth: 0,
        borderRadius: 6,
        flex: 1,
        tintColor: '#FFF'
    },
    searchButton: {
        backgroundColor: '#111',
        borderColor: '#111',
        color: 'white',
    },
    searchIcon: {
        height: 20,
        width: 20,
        marginHorizontal: 4,
        tintColor: '#FFF'
    },
    noResultText: {
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 14
    },
    eventItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#222',
        backgroundColor: '#111'
    },
    loadingIndicator: {
        flex: 1,
    },
    eventsContainer: {
        flex: 1,
        maxHeight: screenHeight - 222
    },
    eventItemDetail: {
        paddingHorizontal: 20
    },
    eventItemLeague: {
        fontSize: 11,
        color: '#ddd'
    },
    eventItemDate: {
        fontSize: 10,
        color: '#999'
    },
    eventItemTeams: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    eventItemTeamName: {
        fontSize: 13,
        color: '#FFF'
    },
    teamLogoImage: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        marginHorizontal: 10,
        marginVertical: 8,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,
        marginHorizontal: 20
    },
    buttonStyle: {
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 4
    },
    buttonText: {
        color: '#FFF',
        fontSize: 12
    },
    buttonOK: {
        backgroundColor: '#E10032',
    },
    buttonCancel: {
        backgroundColor: '#333',
        marginLeft: 10
    },
})