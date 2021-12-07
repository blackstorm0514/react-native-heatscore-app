import React, { PureComponent, createRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import { Modalize } from 'react-native-modalize';
import AddScoreModalContent from './AddScoreModalContent';

export default class AddScoreModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            submit: false,
        }

        this._Mounted = false;
        this.addModalRef = createRef();
    }

    componentDidMount() {
        this._Mounted = true;
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    getSnapshotBeforeUpdate(prevProps) {
        return { shouldOpen: !prevProps.modalOpen && this.props.modalOpen };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot.shouldOpen) {
            this.addModalRef.current?.open();
        }
    }

    onCloseModal = () => {
        const { onAddScoreCard } = this.props;
        this.addModalRef.current?.close();
        onAddScoreCard(null);
    }

    renderModalHeader = () => {
        const { submit } = this.state;
        return (
            <View style={styles.addModalHeader}>
                <TouchableOpacity activeOpacity={0.7}
                    disabled={submit}
                    onPress={this.onCloseModal}>
                    <Text style={styles.modalHeaderAction}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalHeaderTitle}>Add Game</Text>
                <TouchableOpacity activeOpacity={0.7}
                    disabled={submit}
                    onPress={() => this._Mounted && this.setState({ submit: true })}>
                    <Text style={styles.modalHeaderAction}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onAddScoreCard = (time) => {
        const { onAddScoreCard } = this.props;
        this._Mounted && this.setState({ submit: false });
        time && this.addModalRef.current?.close();
        time && onAddScoreCard(time);
    }

    render() {
        const { submit } = this.state;

        return (
            <Modalize
                ref={this.addModalRef}
                HeaderComponent={this.renderModalHeader}
                disableScrollIfPossible
                modalStyle={{ backgroundColor: '#111' }}>
                <AddScoreModalContent submit={submit}
                    onAddScoreCard={this.onAddScoreCard} />
            </Modalize>
        )
    }
};

const styles = StyleSheet.create({
    addModalHeader: {
        flexDirection: 'row',
        backgroundColor: '#222',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 42
    },
    modalHeaderAction: {
        color: '#E10032',
        fontSize: 14
    },
    modalHeaderTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
});
