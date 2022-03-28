import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const googleClientID = {
    android: '893401532366-4g012n0outuoq1ouhrmlft2h3c3c9urc.apps.googleusercontent.com',
    ios: '893401532366-4g012n0outuoq1ouhrmlft2h3c3c9urc.apps.googleusercontent.com',
    web: '893401532366-4g012n0outuoq1ouhrmlft2h3c3c9urc.apps.googleusercontent.com'
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