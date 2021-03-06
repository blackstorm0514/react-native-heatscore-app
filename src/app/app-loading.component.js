import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../redux/reducer';
import { getProfile } from '../redux/services';
// import { auth } from 'react-native-firebase';

const AppLoading = ({ initialConfig, children, placeholder, setUserAction }) => {

    const [loading, setLoading] = React.useState(true);
    const loadingResult = initialConfig || {};

    const onTasksFinish = () => {
        setTimeout(() => { setLoading(false); }, 2000);
    };

    React.useEffect(() => {
        if (loading) {
            startTasks().then(onTasksFinish);
        }
    }, [loading]);

    const startTasks = async () => {
        try {
            // try {
            //     await auth().signInAnonymously();
            //     // console.log('Firebase user signed in.', value);
            // } catch (error) {
            //     console.warn('Firebase signin error', error);
            // }
            const { data: { success, user } } = await getProfile();
            success && setUserAction(user);
            return Promise.resolve();
        } catch (error) {
            return Promise.resolve();
        }
    };

    return (
        <React.Fragment>
            {!loading && children(loadingResult)}
            {placeholder && placeholder({ loading })}
        </React.Fragment>
    );
};

export default connect(null, { setUserAction: actions.setUserAction })(AppLoading);