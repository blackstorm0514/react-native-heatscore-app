import React from 'react';
import { LayoutGridList } from '../../components/layout-grid-list.component';
import { data } from './data';

export const DashboardGridScreen = ({ navigation }) => {

    const onItemPress = (index) => {
        navigation.navigate(data[index].route);
    };

    return (
        <LayoutGridList
            data={data}
            onItemPress={onItemPress}
        />
    );
};
