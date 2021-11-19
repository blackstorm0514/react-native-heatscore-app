import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../redux/reducer';
import { getProfile } from '../redux/services';

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
            const { data: { success, user } } = await getProfile();
            success && setUserAction(user);
            return Promise.resolve();
        } catch (error) {
            console.warn(error);
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