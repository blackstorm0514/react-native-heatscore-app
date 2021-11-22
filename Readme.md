# Reference
https://medium.com/@ndyhrdy/making-the-bottom-sheet-modal-using-react-native-e226a30bed13
https://www.npmjs.com/package/react-native-slide-modal
https://amanhimself.dev/blog/chat-app-with-react-native-part-2/

https://medium.com/geekculture/react-native-generate-apk-debug-and-release-apk-4e9981a2ea51

# Build
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

-- Debug
gradlew assembleDebug
-- Release
gradlew assembleRelease

# Get SHA Key
keytool -list -v -keystore heatscore.keystore -alias heatscore -storepass heatscore -keypass heatscore