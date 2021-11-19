import React from 'react';
import { AppStorage } from '../services/app-storage.service';
import { connect } from 'react-redux';
import { actions } from '../redux/reducer';
import { ApiService } from '../services/api.service';

// const loadingTasks = [
//     () => AppStorage.getToken(null).then(result => ['userToken', result]),
// ];

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
            const { data: { success, user } } = await ApiService.get('/auth/profile');
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