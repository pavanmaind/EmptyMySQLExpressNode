
const crypto = require("crypto");


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
    hashPassword: hashPassword,
    createRandomString: createRandomString
};