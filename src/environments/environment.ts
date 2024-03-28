// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://YOUR_API_URL/public/api/', // ex https://yourapi.com/public/api/ don't forgot to add public/api/ at the end
  imageUrl: 'https://YOUR_API_URL/public/storage/images/', // ex https://yourapi.com/public/storage/images/ don't forgot to add public/storage/images at the end
  firebase: {
    apiKey: "YOURKEY",
    authDomain: "YOURKEY",
    projectId: "YOURKEY",
    storageBucket: "YOURKEY",
    messagingSenderId: "YOURKEY",
    appId: "YOURKEY"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
