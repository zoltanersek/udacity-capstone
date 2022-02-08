

const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = "romance clock eager panic width bread test nuclear position bag parrot shove"
const infuraKey = "dd8bb9054c894aeabf7597368b6bc7e8";


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
      network_id: 4,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }
  },
  mocha: {
    timeout: 100000
 },
 compilers: {
  solc: {
     version: "0.5.2", 
  }}
};