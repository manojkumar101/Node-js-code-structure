const con = require('../../common/mysql');
const util = require('util');
const query = util.promisify(con.query).bind(con);
const functions = require('../../common/functions');
const config = require('../../config');
const validator = require('validator');
const code = require('../../common/statusCode');
const message = require('../../common/message');
const fs = require('fs');
var CronJob = require('cron').CronJob;
class UserService {

  /**
   * API for testingAPIDefinition
   * @param {*} req (user detials)
   * @param {*} res (json with success/failure)
   */
  async testingAPIDefinition(info) {
    try {
      
      const testQuery = `SELECT * FROM testtb`;
      const testQueryDetails = await query(testQuery, []);
     return {
        code: code.success,
        message:  'Working',
        data: testQueryDetails,
      };
    } catch (e) {
      return {
        code: code.unexceptedError,
        message: message.tryCatch,
        data: e.message,
      };
    }
  }


}

module.exports = {
  userService: function () {
    return new UserService();
  },
};
