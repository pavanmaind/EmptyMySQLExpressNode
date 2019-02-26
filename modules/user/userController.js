const path = require('path');
const responseGenerator = require(path.resolve('.', 'utils/responseGenerator.js'));
const userModel = require(path.resolve('.', 'modules/user/userModel.js'));

exports.loginUser = async (req, res) => {
    try {
        let response = await userModel.loginUser(req);
        if (response) {
            res.send(responseGenerator.getResponse(response.code, response.message, response.data));
        }
    }
    catch (error) {
        res.send(responseGenerator.getResponse(error.code, error.message, error.data));
    }

}



exports.registerUser = async (req, res) => {

    try {
        let response = await userModel.addUser(req);
        if (response) {
            res.send(responseGenerator.getResponse(response.code, response.message, response.data));
        }
    }
    catch (error) {
        res.send(responseGenerator.getResponse(error.code, error.message, error.data));
    }

}

