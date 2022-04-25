// import firebase from 'react-native-firebase';

export const ReturnFcmToken = async () => {
    // try {
    //     const fcmToken = await firebase.messaging().getToken();
    //     return fcmToken;
    // } catch (error) {
    //     console.warn('ReturnFcmToken', error);
        return null;
    // }
};

export const RequestPermission = async () => {
    // try {
    //     await firebase.messaging().requestPermission();
    //     return true;
    // } catch (error) {
    //     console.warn('RequestPermission', error);
        return false;
    // }
};

export const CheckPermissionAndReturnFcmToken = async () => {
    // try {
    //     const enabled = await firebase.messaging().hasPermission();
    //     if (enabled) {
    //         const fcmToken = await ReturnFcmToken();
    //         return fcmToken;
    //     } else {
    //         try {
    //             await RequestPermission();
    //             const fcmToken = await ReturnFcmToken();
    //             return fcmToken;
    //         } catch (e) {
    //             console.warn('CheckPermissionAndReturnFcmToken', error);
    //             return null;
    //         }
    //     }
    // } catch (error) {
    //     console.warn('CheckPermissionAndReturnFcmToken', error);
        return null;
    // }
};