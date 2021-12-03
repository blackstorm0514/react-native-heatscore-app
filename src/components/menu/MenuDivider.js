import React from 'react';
import { StyleSheet, View } from 'react-native';

export function MenuDivider({ color = 'rgba(0,0,0,0.12)' }) {
    return (
        <View style={[styles.divider, { borderBottomColor: color }]} />
    )
}

const styles = StyleSheet.create({
    divider: {
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});