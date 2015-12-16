'use strict';

var Contract = require('./contract');

function Eth(web3) {
    var self = this;
    this.web3 = web3;
}

Eth.prototype.contract = function (abi) {
    var factory = new Contract(this, abi);
    return factory;
};

module.exports = Eth;

