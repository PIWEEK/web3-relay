var jwt = require("jsonwebtoken");
var ejwt = require("express-jwt");

var secret = "this is a basic secret";


exports.login = function (account, response) {
    var authToken = jwt.sign(
        {name: account.name},
        secret
    );
    return response.cookie("session-id", authToken);
}


exports.authorize = function (credentialsRequired) {
    return ejwt({
        credentialsRequired: credentialsRequired,
        secret: secret,
        getToken: function fromCookie (request) {
            return request.cookies["session-id"];
        }
    });
}

