import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Tab, TabBar } from '@ui-kitten/components';
import { ProductListScreen } from './product-list.component';

const ProductsTabBar = ({ navigation, state }) => {

  const onTabSelect = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  const renderTab = (route) => (
    <Tab
      key={route}
      title={route.toUpperCase()}
    />
  );

  return (
    <TabBar
      selectedIndex={state.index}
      onSelect={onTabSelect}>
      {state.routeNames.map(renderTab)}
    </TabBar>
  );
};

const TopTabs = createMaterialTopTabNavigator();

export default () => (
  <TopTabs.Navigator tabBar={(props) => <ProductsTabBar {...props}/>}>
    <TopTabs.Screen name='All' component={ProductListScreen}/>
    <TopTabs.Screen name='Furniture' component={ProductListScreen}/>
    <TopTabs.Screen name='Lighting' component={ProductListScreen}/>
  </TopTabs.Navigator>
);
