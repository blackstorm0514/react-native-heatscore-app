import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider } from '@ui-kitten/components';

export const CalendarShowcase = ({ withFooter, ...props }) => {

    const calendarRef = React.useRef();
    const [date, setDate] = React.useState < Date > (props.date);

    const onTodayPress = () => {
        calendarRef.current.scrollToToday();
    };

    const renderFooterElement = () => (
        <React.Fragment>
            <Divider style={styles.footerDivider} />
            <View style={styles.footerContainer}>
                <Button onPress={onTodayPress}>
                    Today
                </Button>
            </View>
        </React.Fragment>
    );

    return (
        <Calendar
            {...props}
            ref={calendarRef}
            date={date}
            onSelect={setDate}
            renderFooter={withFooter && renderFooterElement}
        />
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    footerDivider: {
        marginVertical: 12,
    },
});
