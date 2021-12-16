# Reference
https://medium.com/geekculture/react-native-generate-apk-debug-and-release-apk-4e9981a2ea51
http://blog.magmalabs.io/2021/05/06/how-to-add-push-notification-on-your-react-native-project-using-firebase.html
https://medium.com/@farid12ansari7/integrating-fcm-in-react-native-and-processing-fcm-messages-even-in-background-63abbf6ebea4
# Build
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

-- Debug
gradlew assembleDebug
-- Release
gradlew assembleRelease
gradlew bundleRelease

# Get SHA Key
keytool -list -v -keystore heatscore.keystore -alias heatscore -storepass heatscore -keypass heatscore