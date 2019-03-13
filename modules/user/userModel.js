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


userModel.getUsersList = (req) => {
    return new Promise(async (resolve, reject) => {
        if (typeof (req.body) == 'object') {
            let input = validatePaginationData(req.body);
            if (input) {
                let whereClause = "";
                for (let i = 0; i < input.search_by.length; i++) {
                    if (input.search_by[i].userId) {
                        whereClause = whereClause + " userId = " + input.search_by[i].userId;
                    }
                    else if (input.search_by[i].emailId) {
                        whereClause = whereClause + " emailId LIKE '%" + input.search_by[i].emailId + "%'";
                    }
                    else if (input.search_by[i].fullName) {
                        whereClause = whereClause + " fullName LIKE '%" + input.search_by[i].fullName + "%'";
                    }
                }
                let queryGetRecords = "";
                if (whereClause) {
                    queryGetRecords = "select userId, emailId, fullName from users where " + whereClause + " order by " + input.order_by.selector + " " + input.order_by.desc + " LIMIT " + input.skip + ", " + input.take;
                }
                else {
                    queryGetRecords = "select userId, emailId, fullName from users order by " + input.order_by.selector + " " + input.order_by.desc + " LIMIT " + input.skip + ", " + input.take;
                }


                db.query(queryGetRecords, (error, results) => {
                    if (!error) {
                        logger.info("User's list fetched successfully ");
                        return resolve({
                            code: 200, message: "Success", data: { "count": results.length, "data": results }
                        })
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



// add bulk user registration
userModel.bulkInsertUsers = (req) => {
    return new Promise(async (resolve, reject) => {
        if (typeof (req.body) == 'object') {
            let usersData = validateBulkUserInsertData(req.body);
            if (usersData) {
                let resultData = [];
                for (let k = 0; k < usersData.length; k++) {
                    resultObj= await registerUser(usersData[k]);
                    resultData.push(resultObj);
                }
                return resolve({ code: 200, message: "Success", data: resultData });
            }
            else {
                return reject({ code: 400, message: msg.invalidInput });
            }
        }
        else {
            return reject({ code: 400, message: msg.invalidInput, data: null });
        }
    })
}



// update bulk user records
userModel.bulkUpdateUsers = (req) => {
    return new Promise(async (resolve, reject) => {
        if (typeof (req.body) == 'object') {
            let usersData = validateBulkUserUpdateData(req.body);
            if (usersData) {
                let resultData = [];
                for (let k = 0; k < usersData.length; k++) {
                    resultObj= await updateUser(usersData[k]);
                    resultData.push(resultObj);
                }
                return resolve({ code: 200, message: "Success", data: resultData });
            }
            else {
                return reject({ code: 400, message: msg.invalidInput });
            }
        }
        else {
            return reject({ code: 400, message: msg.invalidInput, data: null });
        }
    })
}



// delete bulk user records
userModel.bulkDeleteUsers = (req) => {
    return new Promise(async (resolve, reject) => {
        if (typeof (req.body) == 'object') {
            let usersData = validateBulkUserDeleteData(req.body);
            if (usersData) {
                let resultData = [];
                for (let k = 0; k < usersData.length; k++) {
                    resultObj= await deleteUser(usersData[k]);
                    resultData.push(resultObj);
                }
                return resolve({ code: 200, message: "Success", data: resultData });
            }
            else {
                return reject({ code: 400, message: msg.invalidInput });
            }
        }
        else {
            return reject({ code: 400, message: msg.invalidInput, data: null });
        }
    })
}




const registerUser = (user) => {
    return new Promise(async (res, rej) => {
        let resultObj = {};
        user.secretKey = functions.createRandomString(20);
        let password = functions.createRandomString(8);
        user.passwordHash = functions.hashPassword(password, user.secretKey);
        const params = [user.fullName, user.emailId, user.passwordHash, user.secretKey]
        resultObj.emailId = user.emailId;

        db.query('call SignupUser(?,?,?,?)', params, (error, results) => {
            if (!error) {
                //check for email already exists in DB
                if (results[0][0].IsOldRecord == 1) {
                    resultObj.status = "Email Already Exists";
                }
                else {
                    resultObj.status = "Success";
                    
                    // generate email body
                    let message = "Hi "
                    +user.fullName+", <br><br>Welcome to The LoginRegApp, your credentials are as below, <br><br>Username: <b>"
                    +user.emailId+"</b> <br>Password: <b>"
                    +password+"</b><br><br>Click <a href="
                    +config.frontendHost+"/users/login>here</a> to login.<br><br>Thanks,<br>LoginRegApp";
                    
                    functions.sendEmail(resultObj.emailId, '[LoginRegApp] '+'Registration successfull', message, function (errorEmailHandler) {
                    });
                }
            } else {
                resultObj.status = "Error while processing";
            }
            return res(resultObj)
        })
    })
}


const updateUser = (user) => {
    return new Promise(async (res, rej) => {
        let resultObj = {};
        const params = [user.fullName, user.userId, 0]
        resultObj.userId = user.userId;

        db.query('update users set fullName = ? where userId = ? and isDeleted = ?', params, (error, results) => {
            if (!error) {
                if(results.changedRows){
                    resultObj.status = "Updated Successfully";
                }
                else if(results.affectedRows){
                    resultObj.status = "No Change";
                }
                else {
                    resultObj.status = msg.noRecordExists;
                }

            } else {
                resultObj.status = "Error while processing";
            }
            return res(resultObj)
        })
    })
}



const deleteUser = (user) => {
    return new Promise(async (res, rej) => {
        let resultObj = {};
        const params = [1, user.userId, 0]
        resultObj.userId = user.userId;

        db.query('update users set isDeleted = ? where userId = ? and isDeleted = ?', params, (error, results) => {
            if (!error) {
                if(results.changedRows){
                    resultObj.status = "Deleted Successfully";
                }
                else {
                    resultObj.status = msg.noRecordExists;
                }

            } else {
                resultObj.status = "Error while processing";
            }
            return res(resultObj)
        })
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

// function to validate pagination data
const validatePaginationData = (input) => {
    let dataToReturn = {};
    dataToReturn.skip = input.skip != undefined ? (typeof (input.skip) == 'number' && input.skip >= 0 ? input.skip : false) : 0;
    dataToReturn.take = input.take != undefined ? (typeof (input.take) == 'number' && input.take >= 0 ? input.take : false) : 10000;
    dataToReturn.order_by = input.order_by ? (typeof (input.order_by) == 'object' && input.order_by.selector && typeof (input.order_by.desc) == "boolean" ? input.order_by : false) : { "selector": "userId", "desc": true };
    dataToReturn.search_by = input.search_by ? (input.search_by.constructor === Array ? input.search_by : false) : [];

    for (let key in dataToReturn) {
        if (dataToReturn[key] === false) {
            return false;
        }
    }
    if (dataToReturn) {
        dataToReturn.order_by.desc = dataToReturn.order_by.desc ? "desc" : "asc";
    }
    return dataToReturn;
}


// function to validate bulk user insert data
const validateBulkUserInsertData = (input) => {
    let dataToReturn = [];
    if (input.constructor === Array) {
        for (let i = 0; i < input.length; i++) {
            dataToReturn[i] = {};
            dataToReturn[i].fullName = input[i].fullName && typeof (input[i].fullName) == 'string' && input[i].fullName.trim().length > 0 ? input[i].fullName.trim() : false;
            dataToReturn[i].emailId = input[i].emailId && typeof (input[i].emailId) == 'string' && input[i].emailId.trim().length > 0 ? input[i].emailId.trim() : false;
        }
    }
    else {
        dataToReturn[0] = {};
        dataToReturn[0].fullName = input.fullName && typeof (input.fullName) == 'string' && input.fullName.trim().length > 0 ? input.fullName.trim() : false;
        dataToReturn[0].emailId = input.emailId && typeof (input.emailId) == 'string' && input.emailId.trim().length > 0 ? input.emailId.trim() : false;
    }

    for (let j = 0; j < dataToReturn.length; j++) {
        for (let key in dataToReturn[j]) {
            if (dataToReturn[j][key] === false) {
                return false;
            }
        }
    }
    return dataToReturn;
}


// function to validate bulk user update data
const validateBulkUserUpdateData = (input) => {
    let dataToReturn = [];
    if (input.constructor === Array) {
        for (let i = 0; i < input.length; i++) {
            dataToReturn[i] = {};
            dataToReturn[i].fullName = input[i].fullName && typeof (input[i].fullName) == 'string' && input[i].fullName.trim().length > 0 ? input[i].fullName.trim() : false;
            dataToReturn[i].userId = typeof (input[i].userId) == 'number' && input[i].userId > 0 ? input[i].userId : false;
        }
    }
    else {
        dataToReturn[0] = {};
        dataToReturn[0].fullName = input.fullName && typeof (input.fullName) == 'string' && input.fullName.trim().length > 0 ? input.fullName.trim() : false;
        dataToReturn[0].userId = typeof (input.userId) == 'number' && input.userId > 0 ? input.userId : false;
    }

    for (let j = 0; j < dataToReturn.length; j++) {
        for (let key in dataToReturn[j]) {
            if (dataToReturn[j][key] === false) {
                return false;
            }
        }
    }
    return dataToReturn;
}



// function to validate bulk user delete data
const validateBulkUserDeleteData = (input) => {
    let dataToReturn = [];
    if (input.constructor === Array) {
        for (let i = 0; i < input.length; i++) {
            dataToReturn[i] = {};
            dataToReturn[i].userId = typeof (input[i].userId) == 'number' && input[i].userId > 0 ? input[i].userId : false;
        }
    }
    else {
        dataToReturn[0] = {};
        dataToReturn[0].userId = typeof (input.userId) == 'number' && input.userId > 0 ? input.userId : false;
    }

    for (let j = 0; j < dataToReturn.length; j++) {
        for (let key in dataToReturn[j]) {
            if (dataToReturn[j][key] === false) {
                return false;
            }
        }
    }
    return dataToReturn;
}


module.exports = userModel;