'use strict';

var SolidityFunction = require('./function');

var ContractFactory = function (eth, abi) {
    this.eth = eth;
    this.abi = abi;
};

ContractFactory.prototype.at = function (address, callback) {
    var contract = new Contract(this.eth, this.abi, address);

    addFunctionsToContract(contract);

    if (callback) {
        callback(null, contract);
    }
    return contract;
};

var addFunctionsToContract = function (contract) {
    contract.abi.filter(function (json) {
        return json.type === 'function';
    }).map(function (json) {
        return new SolidityFunction(contract._eth, json, contract.address);
    }).forEach(function (f) {
        f.attachToContract(contract);
    });
};

var Contract = function (eth, abi, address) {
    this._eth = eth;
    this.address = address;
    this.abi = abi;
};

module.exports = ContractFactory;
