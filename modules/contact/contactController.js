const path = require('path');
const responseGenerator = require(path.resolve('.', 'utils/responseGenerator.js'));
const contactModel = require(path.resolve('.', 'modules/contact/contactModel.js'));

// exports.loginUser = async (req, res) => {
//     try {
//         let response = await userModel.loginUser(req);
//         if (response) {
//             res.send(responseGenerator.getResponse(response.code, response.message, response.data));
//         }
//     }
//     catch (error) {
//         res.send(responseGenerator.getResponse(error.code, error.message, error.data));
//     }

// }



exports.addContact = async (req, res) => {

    try {
        let response = await contactModel.addContact(req);
        if (response) {
            res.send(responseGenerator.getResponse(response.code, response.message, response.data));
        }
    }
    catch (error) {
        res.send(responseGenerator.getResponse(error.code, error.message, error.data));
    }

}


exports.updateContact = async (req, res) => {

    try {
        let response = await contactModel.updateContact(req);
        if (response) {
            res.send(responseGenerator.getResponse(response.code, response.message, response.data));
        }
    }
    catch (error) {
        res.send(responseGenerator.getResponse(error.code, error.message, error.data));
    }

}


exports.deleteContact = async (req, res) => {

    try {
        let response = await contactModel.deleteContact(req);
        if (response) {
            res.send(responseGenerator.getResponse(response.code, response.message, response.data));
        }
    }
    catch (error) {
        res.send(responseGenerator.getResponse(error.code, error.message, error.data));
    }

}

// exports.getUser = async (req, res) => {

//     try {
//         let response = await userModel.addUser(req);
//         if (response) {
//             res.send(responseGenerator.getResponse(response.code, response.message, response.data));
//         }
//     }
//     catch (error) {
//         res.send(responseGenerator.getResponse(error.code, error.message, error.data));
//     }

// }
