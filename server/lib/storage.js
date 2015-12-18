var levelup = require('levelup');


var accountsDB = levelup('./accounts_db', {
    keyEncoding: 'utf-8',
    valueEncoding: 'json',
});


exports.createAccount = function (account) {
    accountsDB.put(account.name, account);
}


exports.getAccount = function (name, callback) {
    accountsDB.get(name, function (err, value) {
        if (err) {
            if (err.notFound) {
                callback(null, null);
            } else {
                callback(err, null);
            }
        } else {
            callback(null, value);
        }
    });
}


exports.getAccountsPublic = function (callback) {
    var accounts = [];
    accountsDB.createValueStream()
        .on('data', function (value) {
            accounts.push({
                'name': value.name,
                'address': value.address
            });
        })
        .on('end', function () {
            callback(accounts);
        });
}
