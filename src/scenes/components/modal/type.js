import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        padding: 8,
        backgroundColor: '#8F9BB3',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    customPosition: {
        top: 100,
    },
});

const defaultModal = {
    title: 'Default',
    props: {},
};

const styledModal = {
    title: 'Styled Modal',
    props: {
        ...defaultModal.props,
        style: styles.container,
    },
};

const customPositionModal = {
    title: 'Custom Position',
    props: {
        ...defaultModal.props,
        style: [styles.container, styles.customPosition],
    },
};

const styledBackdropModal = {
    title: 'Styled Backdrop',
    props: {
        ...styledModal.props,
        backdropStyle: styles.backdrop,
    },
};

const defaultSection = {
    title: 'Default Modal',
    items: [
        defaultModal,
    ],
};

const stylingSection = {
    title: 'Styling',
    items: [
        styledModal,
        styledBackdropModal,
        customPositionModal,
    ],
};

export const modalShowcase = {
    title: 'Modal',
    sections: [
        defaultSection,
        stylingSection,
    ],
};
