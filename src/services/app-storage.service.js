import AsyncStorage from '@react-native-async-storage/async-storage';

const MAPPING_KEY = 'mapping';
const THEME_KEY = 'theme';
const TOKEN_KEY = 'user_token';

export class AppStorage {

    static getMapping = (fallback) => {
        return AsyncStorage.getItem(MAPPING_KEY).then((mapping) => {
            return mapping || fallback;
        });
    };

    static getTheme = (fallback) => {
        return AsyncStorage.getItem(THEME_KEY).then((theme) => {
            return theme || fallback;
        });
    };

    static getToken = (fallback) => {
        return AsyncStorage.getItem(TOKEN_KEY).then((token) => {
            return token || fallback;
        });
    };

    static setMapping = (mapping) => {
        return AsyncStorage.setItem(MAPPING_KEY, mapping);
    };

    static setTheme = (theme) => {
        return AsyncStorage.setItem(THEME_KEY, theme);
    };

    static setToken = (token) => {
        return AsyncStorage.setItem(TOKEN_KEY, token);
    };

    static removeToken = () => {
        return AsyncStorage.removeItem(TOKEN_KEY);
    }

    static getItem = (key) => {
        return AsyncStorage.getItem(key);
    }

    static setItem = (key, value) => {
        return AsyncStorage.setItem(key, value);
    }
}
