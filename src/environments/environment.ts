// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendUrl: 'http://localhost:3500',
  loopbackUrl: 'http://192.168.200.23:3500/api/v1',
  s3EndPoint: 'http://192.168.200.23:9000',
  s3Bucket: 'calidad',
  s3SecretKey: 'minioadmin',
  s3AccessKey: 'minioadmin',
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
