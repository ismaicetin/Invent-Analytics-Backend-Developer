// const config = require('./config');  
var path = require('path');
var fs = require('fs'); 

  

function ResponseModify(req, res, next) {
    req.returnTemplate = function returnJson(data, message, status = 200) {
        let responseTemplate = {
            status: status,
            data: data,
            messages: message
        }
        res.status(200).json(responseTemplate);

    }
    next();
}
 
module.exports = {   
    ResponseModify  
}