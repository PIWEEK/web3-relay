# web3-relay
A web3 relay, to be able to use Ethereum DApps with web3.js from any browser.

## Install server

You need to install first node.js package on your system.

```shell
cd server
npm install
```

(you should see a new node_modules folder inside 'server').

## Run server

Ensure you are running a local Ethereum node, with JSON-RPC service listening at the default port.

```shell
node web3_relay_server.js
```

(the server should start listening at 5000 http port).

