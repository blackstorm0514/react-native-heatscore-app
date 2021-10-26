import React from 'react';

export const LoadFontsTask = (fonts) => {
    return Promise.resolve(null);
};

export const LoadAssetsTask = (assets) => {
    return Promise.resolve(null);
};

/**
 * Loads application configuration and returns content of the application when done.
 *
 * @property {Task[]} tasks - Array of tasks to prepare application before it's loaded.
 * A single task should return a Promise with value and a by which this value is accessible.
 *
 * @property {any} fallback - Fallback configuration that is used as default application configuration.
 * May be useful at first run.
 *
 * @property {(props: { loaded: boolean }) => React.ReactElement} placeholder - Element to render
 * while application is loading.
 *
 * @property {(result: any) => React.ReactElement} children - Should return Application component
 */
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
