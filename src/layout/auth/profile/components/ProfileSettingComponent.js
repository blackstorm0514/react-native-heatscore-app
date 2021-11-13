import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default class ProfileSettingComponent extends PureComponent {
    render() {
        const { style, title, value, navigateAction, ...layoutProps } = this.props;

        return (
            <React.Fragment>
                <TouchableOpacity activeOpacity={0.7} onPress={navigateAction}>
                    <Layout
                        level='1'
                        {...layoutProps}
                        style={[styles.container, style]}>
                        <Text category='s1'>{title}</Text>
                        <Layout style={styles.rightContainer}>
                            {value && <Text category='s1'>{value}</Text>}
                            {navigateAction &&
                                <FontAwesome5Icon
                                    style={styles.forwardButton}
                                    name="chevron-right"
                                    size={20} color='white' />}
                        </Layout>
                    </Layout>
                </TouchableOpacity>
            </React.Fragment>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rightContainer: {
        backgroundColor: 'black',
        flexDirection: 'row',
    },
    forwardButton: {
        marginLeft: 10
    }
});
