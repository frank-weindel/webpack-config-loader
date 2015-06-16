# webpack-config-loader
This loader is used for when you have a set of configuration variables that can change between different environments and you want to compile only one of them into your bundle.

Example config file (app-config.js):
```javascript
/**
 * Web app configuration
 *
 * Configuration thats imported into the bundle based
 * on the target environment by the app's config-loader
 *
 * From a client-side javascript file you can pull this
 * configuration in with:
 *
 *   var config = require('webpack-config-loader!../app-config.js');
 *
 * And access the appropriate nodes via:
 *
 *   console.log(config.apiBaseUrl);
 */
module.exports = {
  development: {
    authServiceBaseUrl: 'http://localhost:8025/',
    apiBaseUrl: 'http://localhost:8024/',
    fbAppId: '34291238041239401'
  },
  demo: {
    authServiceBaseUrl: 'https://auth.demo.example.com/',
    apiBaseUrl: 'http://api.demo.example.com/',
    fbAppId: '43215231541235231'
  },
  staging: {
    authServiceBaseUrl: 'https://auth.test.example.com/',
    apiBaseUrl: 'http://api.test.example.com/',
    fbAppId: '94123562134231412'
  },
  production: {
    authServiceBaseUrl: 'https://auth.example.com/',
    apiBaseUrl: 'http://api.example.com/',
    fbAppId: '13249058202302020'
  }
};
```

To configure what environment config to load use the following in your webpack.config.js:
```javascript
module.exports = {
  /* ... */
  loader: {
    /*
      This data is used by the webpack-config-loader
     */
    configEnvironment: 'development' // <-- Set this to what you want to use
  }
  /* ... */
}
```

There are numerous ways you can modify the webpack config to set the configEnvironment variable dynamically. Grunt's webpack plugin allows you to easily add/override configuration. You can programatically do it with gulp. You can also use [yargs](https://github.com/bcoe/yargs) to populate it via the command line.

From a client-side javascript file you pull this configuration in with:
```javascript
  var appConfig = require('webpack-config-loader!../app-config.js');
```
And access the appropriate variables like so:
```javascript
  console.log(appConfig.apiBaseUrl);
```


