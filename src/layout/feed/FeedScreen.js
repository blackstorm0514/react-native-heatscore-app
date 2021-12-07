import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, TopNavigation, Text } from '@ui-kitten/components';
import { connect } from 'react-redux';

class FeedScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        }
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    renderTitle = () => {
        return <View style={styles.header}>
            <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16 }}>
                Activities
            </Text>
        </View>
    }

    render() {
        return (
            <View style={styles.container} >
                <TopNavigation
                    title={this.renderTitle}
                    accessoryRight={this.addScoreCardActionButton}
                />
                <View>

                </View>
            </View>
        )
    }
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(FeedScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    header: {
        color: 'white',
        borderRadius: 0,
        borderColor: 0,
        backgroundColor: 'black',
        fontSize: 20,
        maxWidth: '70%',
        alignSelf: 'center',
    },
});
