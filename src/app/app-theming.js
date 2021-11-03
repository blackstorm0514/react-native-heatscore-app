import * as eva from '@eva-design/eva';
import { default as customEva } from './app-mapping-eva.json';

export const appMappings = {
    eva: {
        mapping: eva.mapping,
        customMapping: customEva,
    },
};

export const appThemes = {
    eva: {
        light: eva.light,
        dark: eva.dark,
        brand: {
            light: {},
            dark: {},
        },
    },
};
