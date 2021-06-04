const object = require('./user');
const functions = require('../../common/functions');

const controller = {
  
  //User testingAPI API
  testingAPI: async (req, res) => {
  console.log("res", res.locals.requestedData)
    try {
      const registrationDetails = await object
        .userService()
        .testingAPIDefinition(res.locals.requestedData);
      res.send(
        functions.responseGenerator(
          registrationDetails.code,
          registrationDetails.message,
          registrationDetails.data
        )
      );
    } catch (error) {
      res.send(
        functions.responseGenerator(error.code, error.message, error.data)
      );
    }
  },
  
};

module.exports = controller;
