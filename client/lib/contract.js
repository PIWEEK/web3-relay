'use strict';

var ContractFactory = function (eth, abi) {
    this.eth = eth;
    this.abi = abi;
};

ContractFactory.prototype.new = function () {
    var contract = new Contract(this.eth, this.abi);
    return contract;
};

var Contract = function (eth, abi, address) {
    this._eth = eth;
    this.address = address;
    this.abi = abi;
};

module.exports = ContractFactory;
