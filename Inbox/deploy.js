const HDWalletProvider = require('truffle-hdwallet-provider'); //unlock accounts for transaction and publish to different blockchain network using infura io
const Web3 = require('web3');
const { abi, evm} = require('./compile');

const provider = new HDWalletProvider(
    'company cost angry minor indoor canal fall whip club chase idle fiber',
    'https://rinkeby.infura.io/v3/a044351e09314096b75ba92591fd6e26'
);  //network instance

const web3 = new Web3(provider);
const message = "Hi there!";

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);
  
    const result = await new web3.eth.Contract(abi)
      .deploy({ data: "0x" + evm.bytecode.object, arguments: [message] })
      .send({ from: accounts[0] });
  
    console.log("Contract deployed to", result.options.address);
    provider.engine.stop();
  };
  
  deploy();