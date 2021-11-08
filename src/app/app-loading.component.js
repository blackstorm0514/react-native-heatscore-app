import React from 'react';
import { AppStorage } from '../services/app-storage.service';
import { connect } from 'react-redux';
import { getEvent } from '../redux/services';
import { actions } from '../redux/reducer';

const loadingTasks = [
    () => AppStorage.getToken(null).then(result => ['userToken', result]),
];

const AppLoading = ({ initialConfig, children, placeholder, tabs, getEventSuccess }) => {

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

    const saveTaskResult = (result) => {
        if (result) {
            loadingResult[result[0]] = result[1];
        }
    };

    const createRunnableTask = (task) => {
        return task().then(saveTaskResult);
    };

    const loadIniitalEvents = tabs.map(tab => {
        return new Promise((resolve, reject) => {
            getEvent(tab.date)
                .then(({ data: result }) => {
                    const { data, favorites } = result;
                    getEventSuccess(tab.key, { data, favorites });
                })
                .finally(() => {
                    resolve();
                })
        })
    })

    const startTasks = async () => {
        if (loadingTasks) {
            return Promise.all([...loadingTasks.map(createRunnableTask), ...loadIniitalEvents]);
        }
        return Promise.resolve();
    };


    return (
        <React.Fragment>
            {!loading && children(loadingResult)}
            {placeholder && placeholder({ loading })}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    tabs: state.tabs
});

export default connect(mapStateToProps, ({ getEventSuccess: actions.getEventSuccess }))(AppLoading);