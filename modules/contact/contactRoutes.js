const path = require('path');
const api = require(path.resolve('.', 'modules/contact/contactController.js'))
const functions = require(path.resolve('./', 'utils/functions.js'));
const express = require('express');
const router = express.Router();


/**
 * @api {post} /contact/addContact Add Contact
 * @apiName addContact
 * @apiGroup Contact
 *
 * @apiParam {String} number - Contact Number
 * @apiParam {String} countryCode - Country Code
 * @apiParam {String} type - Type
 * @apiParam {String} extension - Extension
 * @apiParam {String} userId - User Id
 * 
 * @apiParamExample {json} Request-Example:
 * {
 * 		"number": "8754754124",
 * 		"countryCode": "091",
 * 		"type": "Home",
 * 		"extension": "123",
 * }
 *
 * @apiSuccess {Object} Contact Details
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Contact added successfully",
 *     "responseData": {
 *         "contactId": 8,
 *         "contactNumber": "8754754124",
 *         "type": "home",
 *         "extension": null,
 *         "countryCode": "091"
 *     }
 * }
 *
 * @apiError Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 UNAUTHORIZED
 * {
 *     "status": 1006,
 *     "message": "Record already exists",
 *     "responseData": null
 * }
 */

// api to add contact
router.post('/addContact', functions.verifyToken, api.addContact);


/**
 * @api {post} /contact/updateContact Update Contact
 * @apiName updateContact
 * @apiGroup Contact
 *
 * @apiParam {String} number - Contact Number
 * @apiParam {String} countryCode - Country Code
 * @apiParam {String} type - Type
 * @apiParam {String} extension - Extension
 * @apiParam {String} contactId - Contact Id
 * 
 * @apiParamExample {json} Request-Example:
 * {
 * 		"number": "9860157360",
 * 		"countryCode": "091",
 * 		"type": "Home",
 * 		"extension": "123",
 * 		"contactId": "8"
 * }
 *
 * @apiSuccess {Object} Contact Details
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Contact updated successfully",
 *     "responseData": {
 *         "contactId": 8,
 *         "contactNumber": "9860157360",
 *         "type": "home",
 *         "extension": null,
 *         "countryCode": "091"
 *     }
 * }
 *
 * @apiError Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 UNAUTHORIZED
 * {
 *     "status": 1006,
 *     "message": "Record already exists",
 *     "responseData": null
 * }
 */

// api to update contact
router.post('/updateContact', functions.verifyToken, api.updateContact);



/**
 * @api {post} /contact/deleteContact Delete Contact
 * @apiName deleteContact
 * @apiGroup Contact
 *
 * @apiParam {String} contactId - Contact Id
 * 
 * @apiParamExample {json} Request-Example:
 * {
 * 		"contactId": "8"
 * }
 *
 * @apiSuccess {Object} Contact Details
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Contact deleted successfully",
 *     "responseData": null
 * }
 *
 * @apiError Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 UNAUTHORIZED
 * {
 *     "status": 1007,
 *     "message": "No record exists",
 *     "responseData": null
 * }
 */

// api to delete contact
router.post('/deleteContact', functions.verifyToken, api.deleteContact);


module.exports = router;
