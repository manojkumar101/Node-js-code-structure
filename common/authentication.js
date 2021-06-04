const functions = require('./functions');
const statusCode = require('./statusCode');
const msg = require('./message');

const authenticationController = {

  validateToken: async (req, res, next) => {
    try {
      if (req.headers.auth) {
        const tokenDecryptInfo = await functions.tokenDecrypt(req.headers.auth);
        if (tokenDecryptInfo.data) {
          res.locals.tokenInfo = tokenDecryptInfo.data;
          const token = await functions.tokenEncrypt(tokenDecryptInfo.data);
          res.header('auth', token);
          next();
        } else {
          throw {
            statusCode: statusCode.unauthorized,
            message: msg.sessionExpire,
            data: {},
          };
        }
      } else {
        throw {
          statusCode: statusCode.bad_request,
          message: msg.tokenMissing,
          data: {},
        };
      }
    } catch (error) {
      return next(error);
    }
  },
  
  validateAdmin: (req, res, next) => {
    try {
      if (res.locals.tokenInfo.role_id === 2) {
        next();
      } else {
        throw {
          statusCode: statusCode.forbidden,
          message: msg.forbidden,
          data: {},
        };
      }
    } catch (error) {
      return next(error);
    }
  },

  decryptRequest: (req, res, next) => {
    try {
      if (req.body) {
        const userinfo = functions.decryptData(req.body);
        res.locals.requestedData = userinfo;
        next();
      } else {
        throw {
          statusCode: statusCode.bad_request,
          message: msg.dataIssue,
          data: {},
        };
      }
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = authenticationController;
