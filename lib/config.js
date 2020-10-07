/*
*
* Crate and export configuration variables
*
*/

// Container for all the environments
const environments = {};

// Staging {default} environments
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'stagging',
  
  'templateGlobals': {
    'appName': 'Reva Event',
    'companyName': 'NotARealCompany, Inc',
    'yearCreated': '2020',
    'baseUrl': 'http://localhost:3000/'
  }

};


// Testing environments
environments.testing = {
  httpPort: 4000,
  httpsPort: 4001,
  envName: 'testing',
  'templateGlobals': {
    'appName': 'Reva Event',
    'companyName': 'NotARealCompany, Inc',
    'yearCreated': '2020',
    'baseUrl': 'http://localhost:3000/'
  }

};

// Production environments
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: 'production',
  'templateGlobals': {
    'appName': 'Reva Event',
    'companyName': 'NotARealCompany, Inc',
    'yearCreated': '2020',
    'baseUrl': 'http://localhost:5000/'
  }

};

// Determine which environment was passed as a command-line argument
const currentEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase(): '';

// check that current env is valid if not default to Staging
const environmentToExport = typeof(environments[currentEnv]) == 'object' ? environments[currentEnv]:environments["staging"]

// Export the module
module.exports = environmentToExport