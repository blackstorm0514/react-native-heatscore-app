import { ApiService } from '../services/api.service';
import { CheckPermissionAndReturnFcmToken } from './fcm_utils';

export const sendFcmToken = async () => {
    try {
        const fcmToken = await CheckPermissionAndReturnFcmToken();
        if (fcmToken) {
            await ApiService.post('/notifications/register', { token: fcmToken });
        }
    }
    catch (error) {
        console.warn('Error', error);
    };
}
