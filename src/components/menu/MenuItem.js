import React from "react";
import { StyleSheet, View, Text, Pressable, Platform } from 'react-native';

export function MenuItem({ children, disabled = false, disabledTextColor = '#bdbdbd', onPress, pressColor = '#e0e0e0', style, textStyle, ...props }) {
    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => ({
                backgroundColor: Platform.OS !== 'android' && pressed ? pressColor : undefined,
            })}
            android_ripple={{ color: pressColor }}
            onPress={onPress}
            {...props}>
            <View style={[styles.container, style]}>
                <Text numberOfLines={1} style={[styles.title, disabled && { color: disabledTextColor }, textStyle]}>
                    {children}
                </Text>
            </View>
        </Pressable >
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        maxWidth: 248,
        minWidth: 124,
    },
    title: {
        fontSize: 14,
        fontWeight: '400',
        paddingHorizontal: 16,
        textAlign: 'left',
    },
});
