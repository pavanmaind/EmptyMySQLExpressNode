
const path = require('path');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require(path.resolve('./', 'config'));
const logger = require(path.resolve('./logger'));
const msg = require(path.resolve('./', 'utils/errorMessages.js'));
const responseGenerator = require(path.resolve('.', 'utils/responseGenerator.js'));
const nodemailer = require('nodemailer');
const fs = require('fs');



const hashPassword = (password, secret) => {
    // validate input parameters
    if (typeof (password) == 'string' && password.length > 0) {
        let hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
        return hash;
    } else {
        return false;
    }
}

const createRandomString = (stringLength) => {
    // validate input parameters
    stringLength = typeof (stringLength) == 'number' && stringLength > 0 ? stringLength : false;
    if (stringLength) {
        let possibleCharacter = 'qwertyuiopasdfghjklzxcvbnm0123456789';
        let str = '';
        for (let i = 1; i <= stringLength; i++) {
            let randomCharacter = possibleCharacter.charAt(Math.floor(Math.random() * possibleCharacter.length));
            str += randomCharacter;
        }
        return str;
    } else {
        return false;
    }
}



const verifyToken = (req, res, next) => {

    var token = req.headers.auth;

    jwt.verify(token, config.privateKey, (err, decoded) => {
        if (err) {
            logger.error(msg.tokenInvalid);
            res.send(responseGenerator.getResponse(1050, msg.tokenInvalid, null))
        } else {
            req.result = decoded;
            next();
        }
    });

}

const sendEmail = (to, subject, message, callback) => {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: '587',
        auth: {
            user: config.emailAccountUserName,
            pass: config.emailAccountPassword
        }

    });

    var mailOptions = {
        from: config.emailAccountUserName,
        to: to,
        subject: subject,
        html: message
    };

    transporter.sendMail(mailOptions, function (err, info) {

        if (err) {

            console.log("sending email error:" + err);
        }
        if (callback) {

            callback(err, info);
        }

    })

}


//moves file
const moveFile = (oldPath, newPath) => {
    return new Promise((resolve, reject) => {
        fs.copyFile(oldPath, newPath, (err) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(true);
            }
        });
    })
    
};



module.exports = {
    hashPassword: hashPassword,
    createRandomString: createRandomString,
    verifyToken: verifyToken,
    sendEmail: sendEmail,
    moveFile: moveFile
    // profilePictureStorage: profilePictureStorage
};