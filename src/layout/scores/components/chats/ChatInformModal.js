import React, { PureComponent } from 'react';
import { StyleSheet, View, } from 'react-native';
import { Button, Text, Modal, Card } from '@ui-kitten/components';
import { AppStorage } from '../../../../services/app-storage.service';

const CHAT_MODAL_KEY = 'chat_modal_key';

export default class ChatInformModal extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            informModal: false
        }
    }
    componentDidMount() {
        AppStorage.getItem(CHAT_MODAL_KEY).then(val => {
            if (val != 'true') {
                this.setState({ informModal: true });
            }
        })
    }

    onCloseInformModal = () => {
        this.setState({ informModal: false });
        AppStorage.setItem(CHAT_MODAL_KEY, 'true')
    }

    render = () => {
        const { informModal } = this.state;
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
                        onPress={this.onCloseInformModal}
                        status='danger'
                        appearance='ghost'
                        size='giant'>
                        Accept
                    </Button>
                </View>
            </Card>
        </Modal>
    }
}

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
