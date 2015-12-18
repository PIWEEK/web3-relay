var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var storage = require('./storage');

var contracts = new Map();


exports.accountsPost = function(request, response) {
    var address;
    if (request.body.name === "pepe") {
        address = "0x14762611b13af65985bd66cbc06ab7a66d343ce4";
    } else if (request.body.name === "manolo") {
        address = "0x584904ea7b5d58542e3077a97b8b5742885131f6";
    } else if (request.body.name === "luis") {
        address = "0x447c9c649e532339523720ccb108dc6dcd2b7fe0";
    } else {
	address = '0x0060eb8b32e4a20a80bc112a00f9de4a0d204e47';
    }
    var account = {
        'name': request.body.name,
        'email': request.body.email,
        'password': request.body.password,
	'address': address,
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
    var abiArray = request.body.abiArray;
    var address = request.body.address;

    var ContractDef = web3.eth.contract(abiArray);
    var contract = ContractDef.at(address);
    contracts.set(address, contract);

    response.json({});
}


exports.contractMethodPost = function (request, response) {
    var address = request.params.address;
    var methodName = request.params.methodname;
    var parameters = request.body;
    console.log(address + "." + methodName + "(" + parameters + ")");

    var contract = contracts.get(address);
    var estimatedGas = 100000;
    //var estimatedGas = contract[methodName].estimateGas();
    //console.log("-> estimated gas:", estimatedGas);

    contract[methodName](...parameters, {
        "from": web3.eth.accounts[0],
        "gas": estimatedGas * 2,
    }, function (err, res) {
        if (err) {
            console.log("#####", err);
            response.json({});
        } else {
            if (res) {
                console.log("===>", res);
                response.json(res);
            } else {
                console.log("===> <empty>");
                response.json({});
            }
        }
    });
}

