const path = require('path');
var jwt = require('jsonwebtoken');
const db = require(path.resolve('.', 'modules/database/databaseConnector.js'));
const msg = require(path.resolve('./', 'utils/errorMessages.js'));
const functions = require(path.resolve('./', 'utils/functions.js'));
const logger = require(path.resolve('./logger'));
const config = require(path.resolve('./config'));

// Create container
const contactModel = {};

// add contact details into database
contactModel.addContact = (req) => {
    return new Promise(async (resolve, reject) => {
        if (typeof (req.body) == 'object') {
            let contact = validateAddContactData(req.body);
            if (contact) {
                let strQuery = {
                    sql: "call AddUpdateContact(?,?,?,?,?,?,?)",
                    values: [contact.number, contact.type, contact.extension, req.result.userId, contact.countryCode, false, null]
                };

                db.query(strQuery, (error, results, fields) => {
                    if (error) {
                        logger.error("Error while processing your request", error);
                        return reject({ code: 1005, message: msg.dbError, data: null });
                    } else {
                        if (results[0][0].IsOldRecord) {
                            logger.warn("Contact already exists");
                            return reject({ code: 1006, message: msg.existingRecord, data: null });
                        }
                        else {
                            logger.info("Contact added successfully - " + results[0][0].contactId);
                            return resolve({
                                code: 200, message: "Contact added successfully", data: results[0][0]
                            });
                        }
                    }
                });
            } else {
                return reject({ code: 400, message: msg.invalidInput });
            }
        }
        else {
            return reject({ code: 400, message: msg.invalidInput, data: null });
        }
    })
}


// update contact details
contactModel.updateContact = (req) => {
    return new Promise(async (resolve, reject) => {
        if (typeof (req.body) == 'object') {
            let contact = validateUpdateContactData(req.body);
            if (contact) {
                let strQuery = {
                    sql: "call AddUpdateContact(?,?,?,?,?,?,?)",
                    values: [contact.number, contact.type, contact.extension, req.result.userId, contact.countryCode, true, contact.contactId]
                };

                db.query(strQuery, (error, results, fields) => {
                    if (error) {
                        logger.error("Error while processing your request", error);
                        return reject({ code: 1005, message: msg.dbError, data: null });
                    } else {
                        if (results[0][0].IsOldRecord) {
                            logger.warn("Contact already exists");
                            return reject({ code: 1006, message: msg.existingRecord, data: null });
                        }
                        else if (results[0][0].NoRecordExists){
                            logger.warn("No record exists");
                            return reject({ code: 1007, message: msg.noRecordExists, data: null });
                        }
                        else {
                            logger.info("Contact added successfully - " + results[0][0].contactId);
                            return resolve({
                                code: 200, message: "Contact updated successfully", data: results[0][0]
                            });
                        }
                    }
                });
            } else {
                return reject({ code: 400, message: msg.invalidInput });
            }
        }
        else {
            return reject({ code: 400, message: msg.invalidInput, data: null });
        }
    })
}



// delete contact details
contactModel.deleteContact = (req) => {
    return new Promise(async (resolve, reject) => {
        if (typeof (req.body) == 'object') {
            let contact = validateDeleteContactData(req.body);
            if (contact) {
                let strQuery = {
                    sql: "update contacts set isDeleted = ? where contactId = ? and userId = ? and isDeleted = ?",
                    values: [true, contact.contactId, req.result.userId, false]
                };

                db.query(strQuery, (error, results, fields) => {
                    if (error) {
                        logger.error("Error while processing your request", error);
                        return reject({ code: 1005, message: msg.dbError, data: null });
                    } else {
                        if(results.affectedRows){
                            logger.info("Contact deleted successfully - " + contact.contactId);
                            return resolve({
                                code: 200, message: "Contact deleted successfully", data: null
                            });
                        }
                        else {
                            logger.warn("No record exists");
                            return reject({ code: 1007, message: msg.noRecordExists, data: null });
                        }
                    }
                });
            } else {
                return reject({ code: 400, message: msg.invalidInput });
            }
        }
        else {
            return reject({ code: 400, message: msg.invalidInput, data: null });
        }
    })
}

// userModel.loginUser = (req) => {
//     return new Promise(async (resolve, reject) => {
//         if (typeof (req.body) == 'object') {
//             // validate user credentials
//             let userCredentials = validateUserCredentials(req.body);
//             if (userCredentials) {
//                 let strQuery = {
//                     sql: "select * from users where emailId = ? and isDeleted = ?",
//                     values: [userCredentials.emailId, 0]
//                 };

//                 db.query(strQuery, (error, results, fields) => {
//                     if (error) {
//                         logger.error("Error while processing your request", error);
//                         return reject({ code: 1005, message: msg.dbError, data: null });
//                         // res.send(responseGenerator.getResponse(1005, msg.dbError, null))
//                     } else {
//                         if (results && results.length > 0) {
//                             const hash = functions.hashPassword(userCredentials.password, results[0].secretKey);
//                             if (hash == results[0].passwordHash) {

//                                 //generation of jwt token
//                                 const token = jwt.sign(
//                                     {
//                                         emailId: results[0].emailId,
//                                         fullName: results[0].fullName,
//                                         userId: results[0].userId
//                                     }, config.privateKey, {
//                                         expiresIn: '365d'
//                                         // expiresIn: '1m'
//                                     });

//                                 return resolve({
//                                     code: 200, message: "Login successful", data: {
//                                         fullName: results[0].fullName,
//                                         emailId: results[0].emailId,
//                                         userId: results[0].userId,
//                                         token: token
//                                     }
//                                 });
//                             }
//                             else {
//                                 return reject({ code: 1003, message: "Please check username or password", data: null });
//                             }
//                         }
//                         else {
//                             return reject({ code: 1003, message: "Please check username or password", data: null });
//                         }
//                     }
//                 });
//             }
//             else {
//                 return reject({ code: 400, message: msg.invalidInput, data: null });
//             }
//         }
//         else {
//             return reject({ code: 400, message: msg.invalidInput, data: null });
//         }


//     })
// }



// function to validate add contact data
const validateAddContactData = (contactData) => {
    let dataToReturn = {};
    const isNumber = /^\d+$/;
    dataToReturn.number = typeof (contactData.number) == "string" && isNumber.test(contactData.number) && 12 >= contactData.number.trim().length > 0 ? contactData.number.trim() : false;
    dataToReturn.countryCode = typeof (contactData.countryCode) == "string" && isNumber.test(contactData.countryCode) && 3 >= contactData.countryCode.trim().length > 0 ? contactData.countryCode.trim() : false;
    dataToReturn.type = typeof (contactData.type) == 'string' && contactData.type.trim().length > 0 ? contactData.type.trim().toLowerCase() : false;
    dataToReturn.extension = dataToReturn.type == "office" ? (isNumber.test(contactData.extension) && 3 >= contactData.extension.trim().length > 0 ? contactData.extension.trim() : false) : null;
    

    for (let key in dataToReturn) {
        if (dataToReturn[key] == false) {
            return false;
        }
    }

    return dataToReturn;
}


// function to validate update conatact data
const validateUpdateContactData = (contactData) => {
    let dataToReturn = {};
    const isNumber = /^\d+$/;
    dataToReturn.number = typeof (contactData.number) == "string" && isNumber.test(contactData.number) && 12 >= contactData.number.trim().length > 0 ? contactData.number.trim() : false;
    dataToReturn.countryCode = typeof (contactData.countryCode) == "string" && isNumber.test(contactData.countryCode) && 3 >= contactData.countryCode.trim().length > 0 ? contactData.countryCode.trim() : false;
    dataToReturn.type = typeof (contactData.type) == 'string' && contactData.type.trim().length > 0 ? contactData.type.trim().toLowerCase() : false;
    dataToReturn.extension = dataToReturn.type == "office" ? (isNumber.test(contactData.extension) && 3 >= contactData.extension.trim().length > 0 ? contactData.extension.trim() : false) : null;
    dataToReturn.contactId = typeof (contactData.contactId) == 'string' && isNumber.test(contactData.contactId) && contactData.contactId.trim().length > 0 ? contactData.contactId.trim() : false;

    for (let key in dataToReturn) {
        if (dataToReturn[key] == false) {
            return false;
        }
    }

    return dataToReturn;
}


// function to validate delete conatact data
const validateDeleteContactData = (contactData) => {
    let dataToReturn = {};
    const isNumber = /^\d+$/;
    
    dataToReturn.contactId = typeof (contactData.contactId) == 'string' && isNumber.test(contactData.contactId) && contactData.contactId.trim().length > 0 ? contactData.contactId.trim() : false;

    for (let key in dataToReturn) {
        if (dataToReturn[key] == false) {
            return false;
        }
    }

    return dataToReturn;
}


// function to validate user credentials
// const validateUserCredentials = (userCredentials) => {
//     userCredentials.emailId = typeof (userCredentials.emailId) == 'string' && userCredentials.emailId.trim().length > 0 ? userCredentials.emailId.trim().toLowerCase() : false;
//     userCredentials.password = typeof (userCredentials.password) == 'string' && userCredentials.password.length > 0 ? userCredentials.password : false;

//     if (!userCredentials.emailId || !userCredentials.password) {
//         return false;
//     } else {
//         return userCredentials;
//     }
// }

module.exports = contactModel;