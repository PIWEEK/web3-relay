'use strict';

var Eth = require('./eth');

function Web3 (provider) {
    this.eth = new Eth(this);
}

module.exports = Web3;

