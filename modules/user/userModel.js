const path = require('path');
const db = require(path.resolve('.', 'modules/database/databaseConnector.js'));
const msg = require(path.resolve('./', 'utils/errorMessages.js'));
const functions = require(path.resolve('./', 'utils/functions.js'));
const logger = require(path.resolve('./logger'));

// Create container
const userModel = {};

// add user registration data into database
userModel.addUser = (req) => {
    return new Promise(async (resolve, reject) => {
        let user = {
            'fullName': req.body.fullName,
            'emailId': req.body.emailId,
            'password': req.body.password
        }

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
                    // res.send(responseGenerator.getResponse(200, "Success", {
                    // name: results[0][0].name,
                    // emailId: results[0][0].emailId,
                    // userId: results[0][0].userId
                    // }))
                }
            } else {
                logger.error("Error while processing your request", error);
                return reject({ code: 1005, message: msg.dbError, data: null });
                // res.send(responseGenerator.getResponse(1005, msg.dbError, null))
            }
        })
    })
}

userModel.loginUser = (req) => {
    return new Promise(async (resolve, reject) => {
        let strQuery = {
            sql: "select * from users where emailId = ? and isDeleted = ?",
            values: [req.body.emailId, 0]
        };

        db.query(strQuery, (error, results, fields) => {
            if (error) {
                logger.error("Error while processing your request", error);
                return reject({ code: 1005, message: msg.dbError, data: null });
                // res.send(responseGenerator.getResponse(1005, msg.dbError, null))
            } else {
                if (results && results.length > 0) {
                    const hash = functions.hashPassword(req.body.password, results[0].secretKey);
                    if (hash == results[0].passwordHash) {
                        //generation of jwt token

                        return resolve({
                            code: 200, message: "Login successful", data: {
                                fullName: results[0].fullName,
                                emailId: results[0].emailId,
                                userId: results[0].userId
                            }
                        });
                        // res.send(responseGenerator.getResponse(200, "Login successful", {
                        //     fullName: results[0].fullName,
                        //     emailId: results[0].emailId,
                        //     userId: results[0].userId
                        // }))
                    }
                    else {
                        return reject({ code: 1003, message: "Please check username or password", data: null });
                        // res.send(responseGenerator.getResponse(1003, "Please check username or password", null))
                    }
                }
                else {
                    return reject({ code: 1003, message: "Please check username or password", data: null });
                    // res.send(responseGenerator.getResponse(1003, "Please check username or password", null))
                }
            }
        });
    })
}

module.exports = userModel;