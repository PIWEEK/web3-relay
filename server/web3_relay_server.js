var express = require('express');
var bodyParser = require('body-parser');

var api = require('./lib/api');

var PREFIX = '/web3-api';
var PORT = 5000

var app = express();
app.use(bodyParser.json());

app.post(PREFIX + '/accounts', api.accountsPost);
app.get(PREFIX + '/accounts', api.accountsGet);
app.get(PREFIX + '/accounts/:name', api.accountGet);
app.get(PREFIX + '/my-account', api.myAccountGet);
app.post(PREFIX + '/contracts', api.contractsPost);
app.post(PREFIX + '/contracts/:name/:methodname', api.contractMethodPost);

app.listen(PORT);
console.log('Listening on port ' + PORT + '...');

