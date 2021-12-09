import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { LoadingIndicator } from './LoadingIndicator';
import { Text } from '@ui-kitten/components';

export default class RenderEventHistoryComponent extends Component {
    renderContent = () => {
        const { event, loading } = this.props;
        if (loading) {
            return (
                <LoadingIndicator style={styles.loadingIndicator} />
            );
        }
        if (!event || !event.history) {
            return (
                <Text style={styles.noDataText}>No Data Availale.</Text>
            );
        }
        const { history } = event;
        return (
            <View>
                
            </View>
        )

    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderContent()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    loadingIndicator: {
        flex: 1
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    },
});
