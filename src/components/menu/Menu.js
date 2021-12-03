import React, { Component } from 'react';
import { Animated, Easing, Dimensions, StatusBar, View, Modal, TouchableWithoutFeedback, Platform, StyleSheet } from 'react-native';

const States = {
    0: "Hidden",
    1: "Animating",
    2: "Shown",
    Animating: 1,
    Hidden: 0,
    Shown: 2,
}
const EASING = Easing.bezier(0.4, 0, 0.2, 1);
const SCREEN_INDENT = 8;
export class Menu extends Component {
    _container = null;
    static defaultProps = {
        animationDuration: 300,
    };
    constructor(props) {
        super(props);
        this.state = {
            menuState: States.Hidden,
            top: 0,
            left: 0,
            menuWidth: 0,
            menuHeight: 0,
            buttonWidth: 0,
            buttonHeight: 0,
            menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
            opacityAnimation: new Animated.Value(0),
        };
    }
    componentDidMount() {
        if (!this.props.visible) {
            return;
        }
        this.show();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.visible === this.props.visible) {
            return;
        }
        if (this.props.visible) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    setContainerRef = (ref) => {
        this._container = ref;
    };
    // Start menu animation
    onMenuLayout = (e) => {
        if (this.state.menuState === States.Animating) {
            return;
        }
        const { width, height } = e.nativeEvent.layout;
        this.setState({
            menuState: States.Animating,
            menuWidth: width,
            menuHeight: height,
        }, () => {
            Animated.parallel([
                Animated.timing(this.state.menuSizeAnimation, {
                    toValue: { x: width, y: height },
                    duration: this.props.animationDuration,
                    easing: EASING,
                    useNativeDriver: false,
                }),
                Animated.timing(this.state.opacityAnimation, {
                    toValue: 1,
                    duration: this.props.animationDuration,
                    easing: EASING,
                    useNativeDriver: false,
                }),
            ]).start();
        });
    };
    show = () => {
        this._container?.measureInWindow((left, top, buttonWidth, buttonHeight) => {
            this.setState({
                buttonHeight,
                buttonWidth,
                left,
                menuState: States.Shown,
                top,
            });
        });
    };
    hide = () => {
        Animated.timing(this.state.opacityAnimation, {
            toValue: 0,
            duration: this.props.animationDuration,
            easing: EASING,
            useNativeDriver: false,
        }).start(() => {
            // Reset state
            this.setState({
                menuState: States.Hidden,
                menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
                opacityAnimation: new Animated.Value(0),
            });
        });
    };
    onRequestClose = () => {
        this.props.onRequestClose?.();
    };
    render() {
        const dimensions = Dimensions.get('window');
        const { width: windowWidth } = dimensions;
        const windowHeight = dimensions.height - (StatusBar.currentHeight || 0);
        const { menuSizeAnimation, menuWidth, menuHeight, buttonWidth, buttonHeight, opacityAnimation, } = this.state;
        const menuSize = {
            width: menuSizeAnimation.x,
            height: menuSizeAnimation.y,
        };
        // Adjust position of menu
        let { left, top } = this.state;
        const transforms = [];
        if (left + menuWidth > windowWidth - SCREEN_INDENT) {
            transforms.push({
                translateX: Animated.multiply(menuSizeAnimation.x, -1),
            });
            left = Math.min(windowWidth - SCREEN_INDENT, left + buttonWidth);
        }
        else if (left < SCREEN_INDENT) {
            left = SCREEN_INDENT;
        }
        // Flip by Y axis if menu hits bottom screen border
        if (top > windowHeight - menuHeight - SCREEN_INDENT) {
            transforms.push({
                translateY: Animated.multiply(menuSizeAnimation.y, -1),
            });
            top = windowHeight - SCREEN_INDENT;
            top = Math.min(windowHeight - SCREEN_INDENT, top + buttonHeight);
        }
        else if (top < SCREEN_INDENT) {
            top = SCREEN_INDENT;
        }
        const shadowMenuContainerStyle = {
            opacity: opacityAnimation,
            transform: transforms,
            top,
            ...(true ? { right: left } : { left }),
        };
        const { menuState } = this.state;
        const animationStarted = menuState === States.Animating;
        const modalVisible = menuState === States.Shown || animationStarted;
        const { testID, anchor, style, children } = this.props;
        return (
            <View ref={this.setContainerRef} collapsable={false} testID={testID}>
                {anchor}
                <Modal visible={modalVisible} onRequestClose={this.onRequestClose} supportedOrientations={[
                    'portrait',
                    'portrait-upside-down',
                    'landscape',
                    'landscape-left',
                    'landscape-right',
                ]}
                    transparent>
                    <TouchableWithoutFeedback onPress={this.onRequestClose} accessible={false}>
                        <View style={StyleSheet.absoluteFill}>
                            <Animated.View onLayout={this.onMenuLayout}
                                style={[styles.shadowMenuContainer, shadowMenuContainerStyle, style]}>
                                <Animated.View style={[styles.menuContainer, animationStarted && menuSize]}>
                                    {children}
                                </Animated.View>
                            </Animated.View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    shadowMenuContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 4,
        opacity: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.14,
                shadowRadius: 2,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    menuContainer: {
        overflow: 'hidden',
    },
});