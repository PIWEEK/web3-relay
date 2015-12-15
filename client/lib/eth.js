'use strict';

var Contract = require('./contract');

function Eth(web3) {
    var self = this;
}

Eth.prototype.contract = function (abi) {
    var factory = new Contract(this, abi);
    return factory;
};

module.exports = Eth;

