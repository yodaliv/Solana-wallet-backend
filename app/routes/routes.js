module.exports = app => {
  const authController = require("../controllers/AuthController.js");

  var router = require("express").Router();

  router.post('/getRandomMessage', authController.getRandomMessage);
  router.post('/verify', authController.Verify);
  app.use('/api', router);
};
