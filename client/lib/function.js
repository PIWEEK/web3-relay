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

SolidityFunction.prototype.attachToContract = function (contract) {
    var execute = this.execute.bind(this);
    var displayName = this.displayName();
    if (!contract[displayName]) {
        contract[displayName] = execute;
    }
    contract[displayName][this.typeName()] = execute; // circular!!!!
    this._contract = contract;
};

SolidityFunction.prototype.execute = function () {
    var relay = this._eth.web3.relay;

    // Convert array-like arguments to real array and ignore undefined
    var parameters = Array.prototype.slice.call(arguments).filter(function (a) {return a !== undefined; });
    // If callback, extract it and remove from parameters
    var callback = this.extractCallback(parameters);

    if (callback) {
        relay.executeMethod(this._address, this.displayName(), parameters)
            .then(function(response) {
                callback(null, response);
            })
            .catch(function(err) {
                callback(err, null);
            })
    } else {
        relay.executeMethod(this._address, this.displayName(), parameters);
        // Don't know how to do a sync call with fetch.
    }
};

SolidityFunction.prototype.extractCallback = function (parameters) {
    if (utils.isFunction(parameters[parameters.length - 1])) {
        return parameters.pop(); // modify the parameters array!
    }
};

module.exports = SolidityFunction;
