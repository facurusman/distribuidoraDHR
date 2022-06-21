// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUsers: 'https://dyg-backend.herokuapp.com/api/user',
  apiClients: 'https://dyg-backend.herokuapp.com/api/client',
  apiProducts: 'https://dyg-backend.herokuapp.com/api/product',
  apiProductsByCliente: 'https://dyg-backend.herokuapp.com/api/product/byClient',
  apiSales: 'https://dyg-backend.herokuapp.com/api/sale',
  apiLists: 'https://dyg-backend.herokuapp.com/api/list'
};
;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
