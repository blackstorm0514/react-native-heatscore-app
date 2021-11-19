import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class FavoriteItemComponent extends PureComponent {
    render() {
        const { style: itemStyle, ...listItemProps } = this.props;
        return (
            <View
                {...listItemProps}
                style={[itemStyle, styles.itemContainer]}>
                <Image
                    style={styles.teamLogoImage}
                    source={{ uri: 'https://assets.b365api.com/images/team/m/3.png' }}
                />
                <Text category='h6' style={styles.teamName}>Los Angeles Lakers</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.toggleFavorite}>
                    <FontAwesomeIcon name="star" color='gold' size={20} style={styles.toggleFavoriteIcon} />
                </TouchableOpacity>
            </View>
        );
    }
};

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
        fontWeight: 'bold'
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
