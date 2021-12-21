import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const googleClientID = {
    android: '893401532366-1vg223i13gku5088khe3ipa6ikalpsue.apps.googleusercontent.com',
    ios: '',
    web: '893401532366-dss8umug8f3at3cmsjfii8f86n87iig0.apps.googleusercontent.com'
}

export const GoogleConfigure = {
    androidClientId: googleClientID.android,
    webClientId: googleClientID.web,
    offlineAccess: true,
}

GoogleSignin.configure(GoogleConfigure);

export const GoogleLogOut = () => {
    GoogleSignin.isSignedIn().then((signedIn) => {
        if (signedIn) {
            GoogleSignin.revokeAccess().catch(() => { });
            GoogleSignin.signOut().catch(() => { });
        }
    }).catch(() => { });
}

export const GoogleSigninConfigured = GoogleSignin;