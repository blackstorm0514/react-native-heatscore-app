import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import TeamLogoImage from '../../../../components/team-logo-image';

class FavoriteItemComponent extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { style: itemStyle, onPress, team, sport, favorites } = this.props;
        const exist = favorites && favorites.find(favorite => favorite.team.name == team.name && favorite.sport == sport);

        return (
            <View
                style={[itemStyle, styles.itemContainer]}>
                <TeamLogoImage image_id={team.image_id} size={20} style={styles.teamLogoImage} />
                <Text style={styles.teamName} numberOfLines={1}>{team.name}</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.toggleFavorite} onPress={() => onPress(sport, team, exist)}>
                    {exist && <MaterialIcons name="star-rate" color='#fdcb04' size={24} />}
                    {!exist && <MaterialIcons name="star-outline" color='#888' size={24} />}
                </TouchableOpacity>
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    favorites: state.favorites,
});

export default connect(mapStateToProps, null)(FavoriteItemComponent);

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignContent: 'center',
        alignItems: 'center'
    },
    teamLogoImage: {
        marginRight: 10,
    },
    teamName: {
        fontWeight: 'bold',
        maxWidth: '70%',
        fontSize: 14
    },
    toggleFavorite: {
        alignSelf: 'flex-end',
        marginLeft: 'auto'
    },
});
