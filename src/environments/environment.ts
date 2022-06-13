// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUsers: 'https://git.heroku.com/dyg-backend.git/api/user',
  apiClients: 'https://git.heroku.com/dyg-backend.git/api/client',
  apiProducts: 'https://git.heroku.com/dyg-backend.git/api/product',
  apiProductsByCliente: 'https://git.heroku.com/dyg-backend.git/api/product/byClient',
  apiSales: 'https://git.heroku.com/dyg-backend.git/api/sale',
  apiLists: 'https://git.heroku.com/dyg-backend.git/api/list'

};
``;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
