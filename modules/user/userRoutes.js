const path = require('path');
const api = require(path.resolve('.', 'modules/user/userController.js'))
const functions = require(path.resolve('./', 'utils/functions.js'));
const express = require('express');
const router = express.Router();


/**
 * @api {post} /user/registerUser Register User
 * @apiName registerUser
 * @apiGroup User
 *
 * @apiParam {String} fullName - Full Name
 * @apiParam {String} emailId - Email Id
 * @apiParam {String} password - Password
 * 
 * @apiParamExample {json} Request-Example:
 * {
 * 		"fullName": "Pavan Maind",
 * 		"emailId": "himanshup@winjit.com",
 * 		"password": "winjit"
 * }
 *
 * @apiSuccess {Object} User Registered details
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Success",
 *     "responseData": {
 *         "emailId": "himanshup@winjit.com",
 *         "userId": 15
 *     }
 * }
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
 * @apiName loginUser
 * @apiGroup User
 *
 * @apiParam {String} emailId - Email Id
 * @apiParam {String} password - Password
 * @apiParamExample {json} Request-Example:
 * {
 * 		"emailId": "pavanm@winjit.com",
 * 		"password": "winjit"
 * }
 *
 * @apiSuccess {Object} User Login details
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Login successful",
 *     "responseData": {
 *         "fullName": "Pavan Maind",
 *         "emailId": "pavanm@winjit.com",
 *         "userId": 10,
 *         "token": "eyJhbGciOiJIUzIrfe5sInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoicGF2YW5tQHdpbmppdC5jb20iLCJmdWxsTmFtZSI6IlBhdmFuIE1haW5kIiwidXNlcklkIjoxMCwiaWF0IjoxNTUxODUyOTA0LCJleHAiOjE1ODMzODg5MDR9.PEZINRsYtCd6RW8kS2fRLSovvh5ZMLh4zngo7rEsqcs"
 *     }
 * }
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



/**
 * @api {get} /user/getUser Get User Details
 * @apiName getUser
 * @apiGroup User
 *
 * @apiHeader {String} auth Users unique access-token.
 * 
 * @apiSuccess {Object} User details
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Success",
 *     "responseData": {
 *         "userId": 13,
 *         "fullName": "Pavan Maind",
 *         "emailId": "akshayj@winjit.com",
 *         "contactInfo": [
 *             {
 *                 "contactId": 3,
 *                 "contactNumber": "8766978804",
 *                 "countryCode": "091",
 *                 "extension": null,
 *                 "type": "home"
 *             },
 *             {
 *                 "contactId": 6,
 *                 "contactNumber": "8983175362",
 *                 "countryCode": "091",
 *                 "extension": null,
 *                 "type": "home"
 *             }
 *         ]
 *     }
 * }
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


// api to get user details
router.get("/getUser", functions.verifyToken, api.getUser);

module.exports = router;
