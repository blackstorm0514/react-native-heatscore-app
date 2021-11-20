import React from 'react';
import { Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNavigationTab, Text, StyleService } from '@ui-kitten/components';
import { BrandBottomNavigation } from './brand-bottom-navigation.component';
import { UserIcon, NewsIcon, ClipboardIcon, FootballIcon } from './icons';

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

const renderTabIcons = (name, currentRoute, otherProps) => {
    const { style } = otherProps;
    const defaultStyle = {
        height: style.height,
        width: style.width,
        marginVertical: 2,
    }
    let active = false;
    switch (name) {
        case 'Scores':
            active = currentRoute.name == 'Scores';
            return <FootballIcon style={{ ...defaultStyle, tintColor: active ? '#FFF' : '#999' }} />
        case 'News':
            active = currentRoute.name == 'News';
            return <NewsIcon style={{ ...defaultStyle, tintColor: active ? '#FFF' : '#999' }} />
        case 'Score Card':
            active = currentRoute.name == 'Score Card';
            return <ClipboardIcon style={{ ...defaultStyle, tintColor: active ? '#FFF' : '#999' }} />
        case 'Account':
            active = currentRoute.name == 'Auth';
            return <UserIcon style={{ ...defaultStyle, tintColor: active ? '#FFF' : '#999' }} />
    }
}

const renderTabTitle = (name, currentRoute) => {
    let active = false;
    const defaultStyle = { fontSize: 14 };
    switch (name) {
        case 'Scores':
            active = currentRoute.name == 'Scores';
            return <Text style={{ ...defaultStyle, color: active ? '#FFF' : '#999' }} >{name}</Text>
        case 'News':
            active = currentRoute.name == 'News';
            return <Text style={{ ...defaultStyle, color: active ? '#FFF' : '#999' }} >{name}</Text>
        case 'Score Card':
            active = currentRoute.name == 'Score Card';
            return <Text style={{ ...defaultStyle, color: active ? '#FFF' : '#999' }} >{name}</Text>
        case 'Account':
            active = currentRoute.name == 'Auth';
            return <Text style={{ ...defaultStyle, color: active ? '#FFF' : '#999' }} >{name}</Text>
    }
}

export const HomeBottomNavigation = ({ navigation, state, descriptors }) => {

    const focusedRoute = state.routes[state.index];
    const { tabBarVisible } = descriptors[focusedRoute.key].options;
    const safeAreaInsets = useSafeAreaInsets();

    const transforms = useVisibilityAnimation(tabBarVisible);

    const onSelect = (index) => {
        console.log(state.routeNames)
        navigation.navigate(state.routeNames[index], { initial: true });
    };

    return (
        <Animated.View style={[styles.container, transforms, { paddingBottom: tabBarVisible ? safeAreaInsets.bottom : 0 }]}>
            <BrandBottomNavigation
                appearance='noIndicator'
                selectedIndex={state.index}
                onSelect={onSelect}>
                <BottomNavigationTab
                    title={() => renderTabTitle('Scores', focusedRoute)}
                    icon={(props) => renderTabIcons('Scores', focusedRoute, props)}
                    style={styles.bottomTab}
                />
                <BottomNavigationTab
                    title={() => renderTabTitle('News', focusedRoute)}
                    icon={(props) => renderTabIcons('News', focusedRoute, props)}
                    style={styles.bottomTab}
                />
                <BottomNavigationTab
                    title={() => renderTabTitle('Score Card', focusedRoute)}
                    icon={(props) => renderTabIcons('Score Card', focusedRoute, props)}
                    style={styles.bottomTab}
                />
                <BottomNavigationTab
                    title={() => renderTabTitle('Account', focusedRoute)}
                    icon={(props) => renderTabIcons('Account', focusedRoute, props)}
                    style={styles.bottomTab}
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
    },
    bottomTab: {
        backgroundColor: '#000',
        tintColor: '#FFF',
        color: '#FFF'
    }
});
