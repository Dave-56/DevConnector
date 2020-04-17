const jwt = require('jsonwebtoken');

const config = require('config');



modules.export = function(req, res, next) {

    //Get token from header
    const token = req.header('x-auth-token');

    //Check if no token
    if(!toe)
}