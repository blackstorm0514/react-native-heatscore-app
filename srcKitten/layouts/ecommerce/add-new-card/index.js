import React, { ReactElement } from 'react';
import { View } from 'react-native';
import {
    Button,
    Datepicker,
    Divider,
    Icon,
    Input,
    Layout,
    StyleService,
    useStyleSheet,
} from '@ui-kitten/components';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { TouchableWithoutFeedback } from 'react-native';

export default ({ navigation }) => {

    const styles = useStyleSheet(themedStyles);

    const [number, setNumber] = React.useState();
    const [name, setName] = React.useState();
    const [date, setDate] = React.useState();
    const [cvv, setCVV] = React.useState();
    const [cvvVisible, setCVVVisible] = React.useState(false);

    const onCVVIconPress = () => {
        setCVVVisible(!cvvVisible);
    };

    const onAddButtonPress = () => {
        navigation && navigation.goBack();
    };

    const renderCVVIcon = (props) => (
        <TouchableWithoutFeedback onPress={onCVVIconPress}>
            <Icon {...props} name={cvvVisible ? 'eye' : 'eye-off'} />
        </TouchableWithoutFeedback>
    );

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Layout
                style={styles.form}
                level='1'>
                <Input
                    style={styles.input}
                    label='CARD NUMBER'
                    placeholder='1234 3456 5677 8907'
                    keyboardType='numeric'
                    maxLength={19}
                    value={number}
                    onChangeText={setNumber}
                />
                <View style={styles.middleContainer}>
                    <Datepicker
                        style={[styles.input, styles.middleInput]}
                        label='EXPIRES'
                        placeholder='09 / 20'
                        date={date}
                        onSelect={setDate}
                    />
                    <Input
                        style={[styles.input, styles.middleInput]}
                        label='CVV'
                        keyboardType='numeric'
                        placeholder='***'
                        maxLength={3}
                        value={cvv}
                        secureTextEntry={!cvvVisible}
                        accessoryRight={renderCVVIcon}
                        onChangeText={setCVV}
                    />
                </View>
                <Input
                    style={styles.input}
                    label='CARDHOLDER NAME'
                    placeholder='Enter Name'
                    value={name}
                    onChangeText={setName}
                />
            </Layout>
            <Divider />
            <Button
                style={styles.addButton}
                size='giant'
                onPress={onAddButtonPress}>
                ADD NEW CARD
            </Button>
        </KeyboardAvoidingView>
    );
};

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    form: {
        flex: 1,
        paddingHorizontal: 4,
        paddingVertical: 24,
    },
    input: {
        marginHorizontal: 12,
        marginVertical: 8,
    },
    middleContainer: {
        flexDirection: 'row',
    },
    middleInput: {
        width: 128,
    },
    addButton: {
        marginHorizontal: 16,
        marginVertical: 24,
    },
});
