import React, { useEffect, useState } from 'react';
import { StyleSheet, View, } from 'react-native';
import { Button, Text, Modal, Card } from '@ui-kitten/components';
import { AppStorage } from '../../../../services/app-storage.service';

const CHAT_MODAL_KEY = 'chat_modal_key';

const ChatInformModal = () => {
    const [informModal, setInformModal] = useState(false);

    useEffect(() => {
        AppStorage.getItem(CHAT_MODAL_KEY).then(val => {
            if (val != 'true') {
                setInformModal(true);
            }
        })
    }, []);

    const onCloseInformModal = () => {
        AppStorage.setItem(CHAT_MODAL_KEY, 'true')
        setInformModal(false);
    }

    return <Modal
        visible={informModal}
        backdropStyle={styles.backDrop}
        onBackdropPress={() => { }}>
        <Card style={styles.informModalCard}>
            <Text category='h6'>Welcome To HeatScore Chat</Text>

            <View style={styles.modalBodyContainer}>
                <Text>Here are a few house rules:</Text>
                <Text style={{ marginTop: 10 }}>1. No spamming</Text>
                <Text>2. No harassing or bullying</Text>
                <Text>3. Have respect for one another</Text>
                <Text>4. No trolling</Text>
                <Text>5. No illegal or inappropriate material</Text>
                <Text style={{ marginTop: 10 }}>Please report any user breaking the rules. </Text>
            </View>

            <View style={styles.modalFooterContainer}>
                <Button style={styles.footerControl}
                    onPress={onCloseInformModal}
                    status='danger'
                    appearance='ghost'
                    size='giant'>
                    Accept
                </Button>
            </View>
        </Card>
    </Modal>
}

export default ChatInformModal;

const styles = StyleSheet.create({
    backDrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    informModalCard: {
        marginHorizontal: 20,
        backgroundColor: '#222',
        flex: 1
    },
    modalBodyContainer: {
        marginVertical: 15
    },
    modalFooterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerControl: {
        marginHorizontal: 4,
        backgroundColor: '#222',
        color: 'red'
    },
});
