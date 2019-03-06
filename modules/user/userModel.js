const path = require('path');
var jwt = require('jsonwebtoken');
const db = require(path.resolve('.', 'modules/database/databaseConnector.js'));
const msg = require(path.resolve('./', 'utils/errorMessages.js'));
const functions = require(path.resolve('./', 'utils/functions.js'));
const logger = require(path.resolve('./logger'));
const config = require(path.resolve('./config'));

// Create container
const userModel = {};

// add user registration data into database
userModel.addUser = (req) => {
    return new Promise(async (resolve, reject) => {
        if (typeof (req.body) == 'object') {
            let user = validateUserData(req.body);
            if (user) {
                user.secretKey = functions.createRandomString(20);
                user.passwordHash = functions.hashPassword(user.password, user.secretKey);
                const params = [user.fullName, user.emailId, user.passwordHash, user.secretKey]
                db.query('call SignupUser(?,?,?,?)', params, (error, results) => {
                    if (!error) {
                        //check for email already exists in DB
                        if (results[0][0].IsOldRecord == 1) {
                            logger.warn("Email Already Exists");
                            return reject({ code: 1004, message: "Email Already Exists", data: null })
                            // res.send(responseGenerator.getResponse(1004, "Email Already Exists", null));
                        }
                        else {
                            logger.info("Registration successfull for user : " + results[0][0].name);
                            return resolve({
                                code: 200, message: "Success", data: {
                                    name: results[0][0].name,
                                    emailId: results[0][0].emailId,
                                    userId: results[0][0].userId
                                }
                            })
                        }
                    } else {
                        logger.error("Error while processing your request", error);
                        return reject({ code: 1005, message: msg.dbError, data: null });
                    }
                })
            } else {
                return reject({ code: 400, message: msg.invalidInput });
            }
        }
        else {
            return reject({ code: 400, message: msg.invalidInput, data: null });
        }
    })
}

userModel.loginUser = (req) => {
    return new Promise(async (resolve, reject) => {
        if (typeof (req.body) == 'object') {
            // validate user credentials
            let userCredentials = validateUserCredentials(req.body);
            if (userCredentials) {
                let strQuery = {
                    sql: "select * from users where emailId = ? and isDeleted = ?",
                    values: [userCredentials.emailId, 0]
                };

                db.query(strQuery, (error, results, fields) => {
                    if (error) {
                        logger.error("Error while processing your request", error);
                        return reject({ code: 1005, message: msg.dbError, data: null });
                        // res.send(responseGenerator.getResponse(1005, msg.dbError, null))
                    } else {
                        if (results && results.length > 0) {
                            const hash = functions.hashPassword(userCredentials.password, results[0].secretKey);
                            if (hash == results[0].passwordHash) {

                                //generation of jwt token
                                const token = jwt.sign(
                                    {
                                        emailId: results[0].emailId,
                                        fullName: results[0].fullName,
                                        userId: results[0].userId
                                    }, config.privateKey, {
                                        expiresIn: '365d'
                                        // expiresIn: '1m'
                                    });

                                return resolve({
                                    code: 200, message: "Login successful", data: {
                                        fullName: results[0].fullName,
                                        emailId: results[0].emailId,
                                        userId: results[0].userId,
                                        token: token
                                    }
                                });
                            }
                            else {
                                return reject({ code: 1003, message: "Please check username or password", data: null });
                            }
                        }
                        else {
                            return reject({ code: 1003, message: "Please check username or password", data: null });
                        }
                    }
                });
            }
            else {
                return reject({ code: 400, message: msg.invalidInput, data: null });
            }
        }
        else {
            return reject({ code: 400, message: msg.invalidInput, data: null });
        }


    })
}




userModel.getUser = (req) => {
    return new Promise(async (resolve, reject) => {

        let strQuery = {
            sql: "select userId, fullName, emailId from users where userId = ? and isDeleted = ?",
            values: [req.result.userId, 0]
        };

        let obj = {};

        db.query(strQuery, (error, results, fields) => {
            if (error) {
                logger.error("Error while processing your request", error);
                return reject({ code: 1005, message: msg.dbError, data: null });
                // res.send(responseGenerator.getResponse(1005, msg.dbError, null))
            } else {
                if (results && results.length > 0) {
                    obj = results[0];

                    strQuery = {
                        sql: "select contactId, contactNumber, countryCode, extension, type from contacts where userId = ? and isDeleted = ?",
                        values: [req.result.userId, 0]
                    };

                    db.query(strQuery, (errorFetchContacts, resultsFetchContacts, fieldsFetchContacts) => {
                        if (errorFetchContacts) {
                            logger.error("Error while processing your request", errorFetchContacts);
                            return reject({ code: 1005, message: msg.dbError, data: null });
                            // res.send(responseGenerator.getResponse(1005, msg.dbError, null))
                        } else {
                            if (resultsFetchContacts && resultsFetchContacts.length > 0) {
                                obj.contactInfo = resultsFetchContacts;
                                return resolve({ code: 200, message: "Success", data: obj });
                            }
                            else {
                                return reject({ code: 1007, message: msg.noRecordExists, data: null });
                            }
                        }
                    });
                }
                else {
                    return reject({ code: 1007, message: msg.noRecordExists, data: null });
                }
            }
        });

    })
}


// function to validate userdata
const validateUserData = (userData) => {
    let dataToReturn = {};
    dataToReturn.fullName = typeof (userData.fullName) == 'string' && userData.fullName.trim().length > 0 ? userData.fullName.trim() : false;
    dataToReturn.emailId = typeof (userData.emailId) == 'string' && userData.emailId.trim().length > 0 ? userData.emailId.trim() : false;
    dataToReturn.password = typeof (userData.password) == 'string' && userData.password.trim().length > 0 ? userData.password.trim() : false;

    for (let key in dataToReturn) {
        if (!dataToReturn[key]) {
            return false;
        }
    }

    return dataToReturn;
}

// function to validate user credentials
const validateUserCredentials = (userCredentials) => {
    userCredentials.emailId = typeof (userCredentials.emailId) == 'string' && userCredentials.emailId.trim().length > 0 ? userCredentials.emailId.trim().toLowerCase() : false;
    userCredentials.password = typeof (userCredentials.password) == 'string' && userCredentials.password.length > 0 ? userCredentials.password : false;

    if (!userCredentials.emailId || !userCredentials.password) {
        return false;
    } else {
        return userCredentials;
    }
}

module.exports = userModel;