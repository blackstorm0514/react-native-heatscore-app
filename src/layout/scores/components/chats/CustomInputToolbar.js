import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Keyboard, } from 'react-native';
import { Actions, Composer, Send, } from 'react-native-gifted-chat';

const styles = StyleSheet.create({
    container: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: "#b2b2b2",
        backgroundColor: "#FFF",
        bottom: 0,
        left: 0,
        right: 0,
    },
    primary: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    accessory: {
        height: 44,
    },
});

const CustomInputToolbar = (props) => {
    const [position, setPosition] = useState('absolute');
    const [keyboardWillShowListener, setKeyboardWillShowListener] = useState(null);
    const [keyboardWillHideListener, setKeyboardWillHideListener] = useState(null);

    const keyboardWillShow = () => {
        if (position !== 'relative') {
            setPosition('relative');
        }
    };
    const keyboardWillHide = () => {
        if (position !== 'absolute') {
            setPosition('absolute');
        }
    };

    useEffect(() => {
        setKeyboardWillShowListener(Keyboard.addListener('keyboardWillShow', keyboardWillShow));
        setKeyboardWillHideListener(Keyboard.addListener('keyboardWillHide', keyboardWillHide));

        return () => {
            if (keyboardWillShowListener) {
                keyboardWillShowListener.remove();
            }
            if (keyboardWillHideListener) {
                keyboardWillHideListener.remove();
            }
        }
    }, []);

    const renderActions = () => {
        const { containerStyle, ...otherProps } = props;
        if (props.renderActions) {
            return props.renderActions(otherProps);
        }
        else if (props.onPressActionButton) {
            return <Actions {...props} />;
        }
        return null;
    }

    const renderSend = () => {
        if (props.renderSend) {
            return props.renderSend(props);
        }
        return <Send {...props} />;
    }

    const renderComposer = () => {
        if (props.renderComposer) {
            return props.renderComposer(props);
        }
        return <Composer {...props} />;
    }

    const renderAccessory = () => {
        if (props.renderAccessory) {
            return (
                <View style={[styles.accessory, props.accessoryStyle]}>
                    {props.renderAccessory(props)}
                </View>
            );
        }
        return null;
    }

    return (
        <View style={[
            styles.container,
            { position: position },
            props.containerStyle,
        ]}>
            {renderAccessory()}
            <View style={[styles.primary, props.primaryStyle]}>
                {renderActions()}
                {renderComposer()}
                {renderSend()}
            </View>
        </View>
    );
}

export default CustomInputToolbar;