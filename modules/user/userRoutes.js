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



/**
 * @api {post} /user/getUsersList Get Users
 * @apiName getUsersList
 * @apiGroup User
 *
 * @apiHeader {String} auth Users unique access-token.
 * 
 * @apiParam {number} skip - skip
 * @apiParam {number} take - take
 * @apiParam {Object} order_by - Object
 * 		{
 * 			@apiParam {String} selector - selector
 * 			@apiParam {Boolean} desc - desc
 * 		}
 * @apiParam {Object[]} [search_by] - search_by
 *  
 * @apiParamExample {json} Request-Example:
 * {
 *     "skip": 0,
 *     "take": 50,
 *     "order_by": {
 *         "selector": "userId",
 *         "desc": false
 *     },
 *     "search_by": [
 *         {
 *             "userId": 14
 *         }
 *     ]
 * }
 * 
 * @apiSuccess {Object} User's list
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Success",
 *     "responseData": {
 *         "count": 1,
 *         "data": [
 *             {
 *                 "userId": 14,
 *                 "emailId": "kirti@winjit.com",
 *                 "fullName": "Pavan Maind"
 *             }
 *         ]
 *     }
 * }
 *
 * @apiError Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 UNAUTHORIZED
 * {
 *     "status": 1050,
 *     "message": "Invalid token",
 *     "responseData": null
 * }
 */


// api to get users with pagination, sorting, searching
router.post("/getUsersList", functions.verifyToken, api.getUsersList);



/**
 * @api {post} /user/bulkInsertUsers Bulk insert users
 * @apiName bulkInsertUsers
 * @apiGroup User
 *
 * @apiHeader {String} auth Users unique access-token.
 * 
 * @apiParam {Object[]} [userData] - userData
 *  
 * @apiParamExample {json} Request-Example:
 * [{
 * 		"fullName": "Pavan Maind",
 * 		"emailId": "pavanm@winjit.com"
 * },
 * {
 * 		"fullName": "Himanshu Patel",
 * 		"emailId": "hp@winjit.com"
 * }]
 * 
 * @apiSuccess {Object} Success Object
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Success",
 *     "responseData": [
 *         {
 *             "emailId": "pavanm@winjit.com",
 *             "status": "Email Already Exists"
 *         },
 *         {
 *             "emailId": "hp@winjit.com",
 *             "status": "Success"
 *         }
 *     ]
 * }
 *
 * @apiError Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 UNAUTHORIZED
 * {
 *     "status": 1050,
 *     "message": "Invalid token",
 *     "responseData": null
 * }
 */


// api to register multiple users
router.post("/bulkInsertUsers", functions.verifyToken, api.bulkInsertUsers);



/**
 * @api {post} /user/bulkUpdateUsers Bulk update users
 * @apiName bulkUpdateUsers
 * @apiGroup User
 *
 * @apiHeader {String} auth Users unique access-token.
 * 
 * @apiParam {Object[]} [userData] - userData
 *  
 * @apiParamExample {json} Request-Example:
 * [{
 * 		"userId": 23,
 * 		"fullName": "Danish Shaikh"
 * },
 * {
 * 		"userId": 26,
 * 		"fullName": "Amol Avhad"
 * }]
 * 
 * @apiSuccess {Object} Success Object
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Success",
 *     "responseData": [
 *         {
 *             "userId": 23,
 *             "status": "No record exists"
 *         },
 *         {
 *             "userId": 26,
 *             "status": "Updated Successfully"
 *         }
 *     ]
 * }
 *
 * @apiError Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 UNAUTHORIZED
 * {
 *     "status": 1050,
 *     "message": "Invalid token",
 *     "responseData": null
 * }
 */


// api to update multiple users
router.post("/bulkUpdateUsers", functions.verifyToken, api.bulkUpdateUsers);




/**
 * @api {post} /user/bulkDeleteUsers Bulk delete users
 * @apiName bulkDeleteUsers
 * @apiGroup User
 *
 * @apiHeader {String} auth Users unique access-token.
 * 
 * @apiParam {Object[]} [userData] - userData
 *  
 * @apiParamExample {json} Request-Example:
 * [
 * {
 * 		"userId": 25
 * },
 * {
 * 		"userId": 27
 * }]
 * 
 * @apiSuccess {Object} Success Object
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Success",
 *     "responseData": [
 *         {
 *             "userId": 25,
 *             "status": "No record exists"
 *         },
 *         {
 *             "userId": 27,
 *             "status": "Deleted Successfully"
 *         }
 *     ]
 * }
 *
 * @apiError Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 UNAUTHORIZED
 * {
 *     "status": 1050,
 *     "message": "Invalid token",
 *     "responseData": null
 * }
 */


// api to delete multiple users
router.post("/bulkDeleteUsers", functions.verifyToken, api.bulkDeleteUsers);

module.exports = router;
