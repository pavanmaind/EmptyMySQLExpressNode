var path = require('path');
var db = require(path.resolve('.', 'modules/database/databaseConnector.js'));
var responseGenerator = require(path.resolve('.', 'utils/responseGenerator.js'));
var config = require(path.resolve('./', 'config'));
var logger = require(path.resolve('./logger'));
var msg = require(path.resolve('./', 'utils/errorMessages.js'));
var functions = require(path.resolve('./', 'utils/functions.js'));


exports.registerUser = (req, res) => {

    var user = {
        'fullName': req.body.fullName,
        'emailId': req.body.emailId,
        'password': req.body.password
    }

    var params = [user.fullName, user.emailId, functions.encrypt(user.password)]
    db.query('call SignupUser(?,?,?)', params, (error, results) => {
        if (!error) {
            //check for email already exists in DB
            if (results[0][0].IsOldRecord == 1) {
                logger.warn("Email Already Exists");
                res.send(responseGenerator.getResponse(1004, "Email Already Exists", null));
            }
            else {
                logger.info("Registration successfull for user : " + results[0][0].name);
                res.send(responseGenerator.getResponse(200, "Success", {
                    name: results[0][0].name,
                    emailId: results[0][0].emailId,
                    userId: results[0][0].userId
                }))
            }
        } else {
            logger.error("Error while processing your request", error);
            res.send(responseGenerator.getResponse(1005, msg.dbError, null))
        }
    })
}


exports.loginUser = (req, res) => {
    var strQuery = {
        sql: "select * from users where emailId = ? and isDeleted = ?",
        values: [req.body.emailId, 0]
    };

    db.query(strQuery, (error, results, fields) => {
        if (error) {
            logger.error("Error while processing your request", error);
            res.send(responseGenerator.getResponse(1005, msg.dbError, null))
        } else {
            if (results && results.length > 0) {
                if (req.body.password == functions.decrypt(results[0].password)) {
                    //generation of jwt token

                    res.send(responseGenerator.getResponse(200, "Login successful", {
                        fullName: results[0].fullName,
                        emailId: results[0].emailId,
                        userId: results[0].userId
                    }))
                }
                else {
                    res.send(responseGenerator.getResponse(1003, "Please check username or password", null))
                }
            }
            else {
                res.send(responseGenerator.getResponse(1003, "Please check username or password", null))
            }
        }
    });

}

