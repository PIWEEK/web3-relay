var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var api = require('./lib/api');
var auth = require('./lib/auth');

var PREFIX = '/web3-api';
var PORT = 5000

var app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "null");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post(PREFIX + '/accounts', api.accountsPost);
app.get(PREFIX + '/accounts', api.accountsGet);
app.get(PREFIX + '/accounts/:name', api.accountGet);
app.post(PREFIX + '/accounts/:name/login', api.accountLogin);
app.get(PREFIX + '/my-account', auth.authorize(true), api.myAccountGet);
app.post(PREFIX + '/contracts', auth.authorize(true), api.contractsPost);
app.post(PREFIX + '/contracts/:address/:methodname', auth.authorize(true), api.contractMethodPost);

app.listen(PORT);
console.log('Listening on port ' + PORT + '...');

