var path = require("path");
var loaderUtils = require("loader-utils");
var fs = require('fs');
var vm = require('vm');

module.exports = function(content) {

  var environment;
  try {
    environment = this.options.loader.configEnvironment || 'development';
  }
  catch (e) {
    environment = 'development';
    console.error('Missing loader.configEnvironment key from webpack config. Assuming "development".');
  }

  /*
    Run code in a special context
   */
  var sandbox = { module: {} };
  vm.runInNewContext(content, sandbox, this.resourcePath);

  /*
    Grab the appropriate configuration based on environment
   */
  var allConfigs = sandbox.module.exports
  var envConfig = allConfigs[environment];

  return "module.exports = " + JSON.stringify(envConfig) + ";"
};