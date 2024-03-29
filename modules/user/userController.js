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


exports.getUser = async (req, res) => {
    try {
        let response = await userModel.getUser(req);
        if (response) {
            res.send(responseGenerator.getResponse(response.code, response.message, response.data));
        }
    }
    catch (error) {
        res.send(responseGenerator.getResponse(error.code, error.message, error.data));
    }
}


exports.getUserDataByToken = async (req, res) => {
    try {
        let response = await userModel.getUserDataByToken(req);
        if (response) {
            res.send(responseGenerator.getResponse(response.code, response.message, response.data));
        }
    }
    catch (error) {
        res.send(responseGenerator.getResponse(error.code, error.message, error.data));
    }
}


exports.getUsersList = async (req, res) => {

    try {
        let response = await userModel.getUsersList(req);
        if (response) {
            res.send(responseGenerator.getResponse(response.code, response.message, response.data));
        }
    }
    catch (error) {
        res.send(responseGenerator.getResponse(error.code, error.message, error.data));
    }

}


exports.bulkInsertUsers = async (req, res) => {

    try {
        let response = await userModel.bulkInsertUsers(req);
        if (response) {
            res.send(responseGenerator.getResponse(response.code, response.message, response.data));
        }
    }
    catch (error) {
        res.send(responseGenerator.getResponse(error.code, error.message, error.data));
    }

}

exports.bulkUpdateUsers = async (req, res) => {

    try {
        let response = await userModel.bulkUpdateUsers(req);
        if (response) {
            res.send(responseGenerator.getResponse(response.code, response.message, response.data));
        }
    }
    catch (error) {
        res.send(responseGenerator.getResponse(error.code, error.message, error.data));
    }

}



exports.bulkDeleteUsers = async (req, res) => {

    try {
        let response = await userModel.bulkDeleteUsers(req);
        if (response) {
            res.send(responseGenerator.getResponse(response.code, response.message, response.data));
        }
    }
    catch (error) {
        res.send(responseGenerator.getResponse(error.code, error.message, error.data));
    }

}

exports.uploadProfilePic = async (req, res) => {

    try {
        let response = await userModel.uploadProfilePic(req);
        res.send(responseGenerator.getResponse(response.code, response.message, response.data));
    }
    catch (error) {
        res.send(responseGenerator.getResponse(error.code, error.message, error.data));
    }

}
