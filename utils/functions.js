var path = require('path');
var config = require(path.resolve('./', 'config'));
const CryptoJS = require("crypto-js");


const decrypt = (encryptedText) => {
    var encrypted = CryptoJS.AES.decrypt(encryptedText, config.secretKey);
    var plainText = encrypted.toString(CryptoJS.enc.Utf8);
    if (plainText == "")
        return null;
    else
        return plainText;
}

// method to encrypt password
const encrypt = (plainText) => {
    var encrypted = CryptoJS.AES.encrypt(plainText, config.secretKey);
    var encryptedText = encrypted.toString();
    return encryptedText;
}



module.exports = {
    decrypt: decrypt,
    encrypt: encrypt
};