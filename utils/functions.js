var path = require('path');
var config = require(path.resolve('./', 'config'));
// const CryptoJS = require("crypto-js");
const crypto = require("crypto");


// const decrypt = (encryptedText) => {
//     var encrypted = CryptoJS.AES.decrypt(encryptedText, config.secretKey);
//     var plainText = encrypted.toString(CryptoJS.enc.Utf8);
//     if (plainText == "")
//         return null;
//     else
//         return plainText;
// }

// method to encrypt password
// const encrypt = (plainText) => {
//     var encrypted = CryptoJS.AES.encrypt(plainText, config.secretKey);
//     var encryptedText = encrypted.toString();
//     return encryptedText;
// }

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

module.exports = {
    // decrypt: decrypt,
    // encrypt: encrypt,
    hashPassword: hashPassword,
    createRandomString: createRandomString
};