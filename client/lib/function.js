'use strict';

var utils = require('./utils');

var SolidityFunction = function (eth, json, address) {
    this._name = utils.transformToFullName(json);
};

SolidityFunction.prototype.displayName = function () {
    return utils.extractDisplayName(this._name);
};

SolidityFunction.prototype.typeName = function () {
    return utils.extractTypeName(this._name);
};

SolidityFunction.prototype.execute = function () {
    console.log("execute, args:", arguments);
};

SolidityFunction.prototype.attachToContract = function (contract) {
    var execute = this.execute.bind(this);
    var displayName = this.displayName();
    if (!contract[displayName]) {
        contract[displayName] = execute;
    }
    contract[displayName][this.typeName()] = execute; // circular!!!!
};

module.exports = SolidityFunction;
