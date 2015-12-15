//var Web3 = require('web3');
//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var storage = require('./storage');


exports.accountsPost = function(request, response) {
    var account = {
        'name': request.body.name,
        'email': request.body.email,
        'password': request.body.password,
	'address': '0x0060eb8b32e4a20a80bc112a00f9de4a0d204e47',
    }

    storage.createAccount(account);

    response.json(account);
}


exports.accountsGet = function(request, response) {
    //var accounts = web3.eth.accounts;
    //console.log(accounts);

    storage.getAccountsPublic(function (accounts) {
        response.json(accounts);
    });
}


exports.accountGet = function(request, response) {
    storage.getAccount(request.params.name, function (err, account) {
        if (account) {
            response.json({
                'name': account.name,
            });
        } else {
            response.status(404).end();
        }
    });
}


exports.myAccountGet = function (request, response) {
    // Provisional until authentication works: get the first account
    storage.getAccountsPublic(function (accounts) {
        if (accounts.length > 0) {
            storage.getAccount(accounts[0].name, function (err, account) {
                response.json(account);
            });
        } else {
            response.status(403).end();
        }
    });
}


exports.contractsPost = function(request, response) {
    console.log('name: ', request.body.name);
    console.log('address: ', request.body.address);
    console.log('abiArray: ', request.body.abiArray);
    response.json({});
}


exports.contractMethodPost = function (request, response) {
    console.log(request.body);
    response.json({});
}

