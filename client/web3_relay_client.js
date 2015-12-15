//var ChuskyContractDef = '<descriptor del contrato de los chuskys';
//var ChuskyContract = web3.eth.contract(ChuskyContractDef);
//
//var chuskyContractInstance = ChuskyContract.at([<dirección de la instancia del contrato de chuskys>]);
//
//var result = chuskyContractInstance.metodoDelContratoChusky(arg1, arg2, arg3);

'use strict';

var Web3 = require('./lib/web3');

// dont override global variable
if (typeof window !== 'undefined' && typeof window.Web3 === 'undefined') {
    window.Web3 = Web3;
}

module.exports = Web3;
