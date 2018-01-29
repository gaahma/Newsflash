const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const credentials = require('./authCredentials');

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 10,
      jwksUri: credentials.uri,
  }),
  audience: credentials.audience,
  issuer: credentials.issuer,
  algorithms: ['RS256']
});

module.exports = jwtCheck;