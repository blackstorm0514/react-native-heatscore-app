import React from 'react';
import { Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNavigationTab, Divider, StyleService } from '@ui-kitten/components';
import { BrandBottomNavigation } from './brand-bottom-navigation.component';
import {
    UserIcon, NewsIcon, ClipboardIcon, FootballIcon
} from './icons';

const useVisibilityAnimation = (visible) => {

    const animation = React.useRef(new Animated.Value(visible ? 1 : 0));

    React.useEffect(() => {
        Animated.timing(animation.current, {
            duration: 200,
            toValue: visible ? 1 : 0,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    return {
        transform: [
            {
                translateY: animation.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                }),
            },
        ],
        position: visible ? null : 'absolute',
    };
};

export const HomeBottomNavigation = ({ navigation, state, descriptors }) => {

    const focusedRoute = state.routes[state.index];
    const { tabBarVisible } = descriptors[focusedRoute.key].options;
    const safeAreaInsets = useSafeAreaInsets();

    const transforms = useVisibilityAnimation(tabBarVisible);

    const onSelect = (index) => {
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <Animated.View style={[styles.container, transforms, { paddingBottom: tabBarVisible ? safeAreaInsets.bottom : 0 }]}>
            <Divider style={styles.divider} />
            <BrandBottomNavigation
                appearance='noIndicator'
                selectedIndex={state.index}
                onSelect={onSelect}>
                <BottomNavigationTab
                    title='Scores'
                    icon={FootballIcon}
                />
                <BottomNavigationTab
                    title='News'
                    icon={NewsIcon}
                />
                <BottomNavigationTab
                    title='Score Card'
                    icon={ClipboardIcon}
                />
                <BottomNavigationTab
                    title='Auth'
                    icon={UserIcon}
                />
            </BrandBottomNavigation>
        </Animated.View>
    );
};

const styles = StyleService.create({
    container: {
        left: 0,
        right: 0,
        bottom: 0,
    },
    divider: {
        backgroundColor: 'white'
    }
});
