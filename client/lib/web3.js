'use strict';

var Eth = require('./eth');
var Relay = require('./relay');

function Web3 (relayUrl) {
    this.relay = new Relay(relayUrl);
    this.eth = new Eth(this);
}

module.exports = Web3;

