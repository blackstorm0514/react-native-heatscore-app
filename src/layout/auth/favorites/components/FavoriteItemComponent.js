import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

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
                <Image
                    style={styles.teamLogoImage}
                    source={{ uri: `https://assets.b365api.com/images/team/m/${team.image_id}.png` }}
                />
                <Text category='h6' style={styles.teamName} numberOfLines={1}>{team.name}</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.toggleFavorite} onPress={() => onPress(sport, team, exist)}>
                    {exist && <FontAwesomeIcon name="star" color='gold' size={20} style={styles.toggleFavoriteIcon} />}
                    {!exist && <FontAwesomeIcon name="star-o" color='#888' size={20} style={styles.toggleFavoriteIcon} />}
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
        width: 30,
        height: 30,
        marginRight: 10,
        resizeMode: 'center',
    },
    teamName: {
        fontWeight: 'bold',
        maxWidth: '70%'
    },
    toggleFavorite: {
        alignSelf: 'flex-end',
        marginLeft: 'auto'
    },
    toggleFavoriteIcon: {
        shadowColor: 'yellow',
        shadowRadius: 3,
        shadowOpacity: 0.8
    }
});
