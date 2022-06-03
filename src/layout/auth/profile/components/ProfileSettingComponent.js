import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class ProfileSettingComponent extends PureComponent {
    render() {
        const { style, title, value, navigateAction, disabled, ...layoutProps } = this.props;

        return (
            <SafeAreaView>
                <React.Fragment>
                    <TouchableOpacity activeOpacity={0.7} onPress={navigateAction} disabled={disabled}>
                        <Layout
                            level='1'
                            {...layoutProps}
                            style={[styles.container, style]}>
                            <Text category='s1'>{title}</Text>
                            <View style={styles.rightContainer}>
                                {value && <Text category='s1'>{value}</Text>}
                                {navigateAction &&
                                    <FontAwesome5Icon
                                        style={styles.forwardButton}
                                        name="chevron-right"
                                        size={20} color='white' />}
                            </View>
                        </Layout>
                    </TouchableOpacity>
                </React.Fragment>
            </SafeAreaView>
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
        flexDirection: 'row',
    },
    forwardButton: {
        marginLeft: 10
    }
});
