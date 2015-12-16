'use strict';

var utils = require('./utils');

var SolidityFunction = function (eth, json, address) {
    this._eth = eth;
    this._name = utils.transformToFullName(json);
    this._address = address;
};

SolidityFunction.prototype.displayName = function () {
    return utils.extractDisplayName(this._name);
};

SolidityFunction.prototype.typeName = function () {
    return utils.extractTypeName(this._name);
};

SolidityFunction.prototype.execute = function () {
    var relay = this._eth.web3.relay;
    var parameters = Array.prototype.slice.call(arguments); // Convert array-like arguments to real array
    relay.executeMethod(this._address, this.displayName(), parameters)
};

SolidityFunction.prototype.attachToContract = function (contract) {
    var execute = this.execute.bind(this);
    var displayName = this.displayName();
    if (!contract[displayName]) {
        contract[displayName] = execute;
    }
    contract[displayName][this.typeName()] = execute; // circular!!!!
    this._contract = contract;
};

module.exports = SolidityFunction;
