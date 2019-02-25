var path = require('path');
var api = require(path.resolve('.', 'modules/user/userController.js'))
var express = require('express');
var router = express.Router();


/**
 * @api {post} /user/registerUser Register User
 * @apiName Register User
 * @apiGroup User
 *
 * @apiParam {String} fullName - Full Name
 * @apiParam {String} emailId - Email Id
 * @apiParam {String} password - Password
 *  {
 *      	"fullName": "Pavan Maind",
 *       	"emailId": "pavanm@winjit.com",
 *       	"password": "winjit"
 *  }
 *
 * @apiSuccess {Object} User Registered details
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *     "status": 200,
 *     "message": "Success",
 *     "responseData": {
 *         "emailId": "janvi@winjit.com",
 *         "userId": 2
 *     }
 *  }
 *
 * @apiError Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 UNAUTHORIZED
 *  {
 *      "status": 1004,
 *      "message": "Email Already Exists",
 *      "responseData": null
 *  }
 */


// api to register user
router.post('/registerUser', api.registerUser);



/**
 * @api {post} /user/loginUser Login User
 * @apiName Login User
 * @apiGroup User
 *
 * @apiParam {String} emailId - Email Id
 * @apiParam {String} password - Password
 *  {
 *       	"emailId": "pavanm@winjit.com",
 *       	"password": "winjit"
 *  }
 *
 * @apiSuccess {Object} User Login details
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *     "status": 200,
 *     "message": "Success",
 *     "responseData": {
 *         "fullName": "Pavan Maind",
 *         "emailId": "janvi@winjit.com",
 *         "userId": 2
 *     }
 *  }
 *
 * @apiError Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 UNAUTHORIZED
*  {
*      "status": 1003,
*      "message": "Please check username or password",
*      "responseData": null
*  }
 */


// api to login user
router.post("/loginUser", api.loginUser);

module.exports = router;
