'use strict';

function Relay(relayUrl) {
    this.baseUrl = relayUrl + '/web3-api';
}

Relay.prototype.login = function (name, password, cbOk, cbError) {
    var payload = {
        name: name,
        password: password,
    };
    return this._apiCall('/accounts/' + name + '/login', 'post', payload, cbOk, cbError);
};

Relay.prototype.createContract = function (address, abiArray, cbOk, cbError) {
    var payload = {
        address: address,
        abiArray: abiArray,
    };
    return this._apiCall('/contracts', 'post', payload, cbOk, cbError);
};

Relay.prototype.executeMethod = function (address, methodName, parameters, mode, cbOk, cbError) {
    return this._apiCall('/contracts/' + address + '/' + methodName + '?mode=' + mode, 'post', parameters, cbOk, cbError);
};

Relay.prototype._apiCall = function (path, method, payload, cbOk, cbError) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.addEventListener("load", function() {
        cbOk(JSON.parse(this.responseText));
    });

    xmlhttp.withCredentials = true;
    xmlhttp.open(method, this.baseUrl + path, true);
    xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(JSON.stringify(payload));
}

module.exports = Relay;

