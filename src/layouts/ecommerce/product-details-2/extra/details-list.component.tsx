import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { ListProps, Text } from '@ui-kitten/components';

export type DetailsListProps = Omit<ListProps, 'renderItem'>;

export interface DetailsListItem {
  title;
  description;
}

export const DetailsList = (props: DetailsListProps)<ViewProps> => {

  const { style, data, ...viewProps } = props;

  const renderItem = (item: DetailsListItem, index) => (
    <View
      key={index}
      style={styles.item}>
      <Text
        appearance='hint'
        category='s2'>
        {item.title}
      </Text>
      <Text category='s1'>
        {item.description}
      </Text>
    </View>
  );

  return (
    <View
      {...viewProps}
      style={[styles.container, style]}>
      {data.map(renderItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
});
