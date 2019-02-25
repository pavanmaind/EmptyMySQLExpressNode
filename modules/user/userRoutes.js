var path = require('path');
var api = require(path.resolve('.', 'modules/user/userController.js'))
var express = require('express');
var router = express.Router();

// api to register user
router.post('/registerUser', api.registerUser);

// api to login user
router.post("/loginUser", api.loginUser);

module.exports = router;
