var ContractFactory = function (eth, abi) {
    this.eth = eth;
    this.abi = abi;

    this.new.getData = this.getData.bind(this);
};

ContractFactory.prototype.new = function () {
    var contract = new Contract(this.eth, this.abi);

    //// parse arguments
    //var options = {}; // required!
    //var callback;

    //var args = Array.prototype.slice.call(arguments);
    //if (utils.isFunction(args[args.length - 1])) {
    //    callback = args.pop();
    //}

    //var last = args[args.length - 1];
    //if (utils.isObject(last) && !utils.isArray(last)) {
    //    options = args.pop();
    //}

    //var bytes = encodeConstructorParams(this.abi, args);
    //options.data += bytes;

    //if (callback) {

    //    // wait for the contract address adn check if the code was deployed
    //    this.eth.sendTransaction(options, function (err, hash) {
    //        if (err) {
    //            callback(err);
    //        } else {
    //            // add the transaction hash
    //            contract.transactionHash = hash;

    //            // call callback for the first time
    //            callback(null, contract);

    //            checkForContractAddress(contract, callback);
    //        }
    //    });
    //} else {
    //    var hash = this.eth.sendTransaction(options);
    //    // add the transaction hash
    //    contract.transactionHash = hash;
    //    checkForContractAddress(contract);
    //}

    return contract;
};

var Contract = function (eth, abi, address) {
    this._eth = eth;
    //this.transactionHash = null;
    this.address = address;
    this.abi = abi;
};

module.exports = ContractFactory;
