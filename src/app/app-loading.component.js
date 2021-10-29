import React from 'react';

export const AppLoading = (props) => {

    const [loading, setLoading] = React.useState(true);
    const loadingResult = props.initialConfig || {};

    const onTasksFinish = () => {
        setLoading(false);
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

    const startTasks = async () => {
        if (props.tasks) {
            return Promise.all(props.tasks.map(createRunnableTask));
        }
        return Promise.resolve();
    };

    return (
        <React.Fragment>
            {!loading && props.children(loadingResult)}
            {props.placeholder && props.placeholder({ loading })}
        </React.Fragment>
    );
};
