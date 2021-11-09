import React from 'react';
import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { StyleSheet, Image } from 'react-native'
import { ArrowIosBackIcon } from '../../../../components/icons';
import logoScreen from '../../../../assets/images/hs-white-256.png';

export const TopNavigationComponent = ({ navigation, backPosition }) => {
    const renderTitle = () => (
        <Image source={logoScreen} style={styles.titleImage} />
    )

    const goBackAction = () => {
        return (
            <TopNavigationAction
                icon={ArrowIosBackIcon}
                onPress={() => navigation.navigate(backPosition ? backPosition : 'Profile')}
            />
        )
    }
    return (
        <TopNavigation
            title={renderTitle}
            accessoryLeft={goBackAction}
        />
    )
}

const styles = StyleSheet.create({
    titleImage: {
        marginVertical: 4
    },
});