package com.heatscore;

import android.util.Log;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import java.util.Map;
import io.invertase.firebase.Utils;

public class FirebaseMessageService extends FirebaseMessagingService {

    private static final String TAG = "FirebaseMsgService";
    public static final String MESSAGE_EVENT = "messaging-message";
    public static final String REMOTE_NOTIFICATION_EVENT = "notifications-remote-notification";

    /**
     * Called when message is received.
     *
     * @param remoteMessage Object representing the message received from Firebase
     *                      Cloud Messaging.
     */
    // onMessageReceived will always be triggered for data only messages even in
    // background
    // onMessageRecevied for FCM messages with notification body will only be
    // triggered if app is in foreground
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d(TAG, remoteMessage.getFrom());
        if (remoteMessage.getNotification() != null) {
            // FCM messages having notification body will be processed here
            Intent notificationEvent = new Intent(REMOTE_NOTIFICATION_EVENT);
            notificationEvent.putExtra("notification", remoteMessage);

            // Broadcast it to the (foreground) RN Application
            LocalBroadcastManager
                    .getInstance(this)
                    .sendBroadcast(notificationEvent);
        } else if (remoteMessage.getData() != null) {
            // data only FCM messages will be processed here

            // put your logic that you want to perform on receiving data only FCM messages
            // this part is the key as you restart services, update shared preferences etc.
            try {
                Map<String, String> messageMap = remoteMessage.getData();

                // if app is in foreground.
                if (Utils.isAppInForeground(this.getApplicationContext())) {
                    Intent messagingEvent = new Intent(MESSAGE_EVENT);
                    messagingEvent.putExtra("message", remoteMessage);
                    // Broadcast it to RN Application
                    LocalBroadcastManager
                            .getInstance(this)
                            .sendBroadcast(messagingEvent);
                }
            } catch (Throwable t) {
                // handle error logic
            }
        }
    }

    /**
     * Called if InstanceID token is updated. This may occur if the security of
     * the previous token had been compromised. Note that this is called when the
     * InstanceID token
     * is initially generated so this is where you would retrieve the token.
     */
    @Override
    public void onNewToken(String token) {
        Log.d(TAG, "Refreshed token: " + token);
        // If you want to send messages to this application instance or
        // manage this apps subscriptions on the server side, send the
        // Instance ID token to your app server.
        sendRegistrationToServer(token);
    }

    /**
     *
     * @param token The new token.
     */
    public void sendRegistrationToServer(String token) {
        // put your logic here to update fcm registration token
    }

}