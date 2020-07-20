// Load environment variables.
// require("dotenv").config();

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const mnemonic = "company cost angry minor indoor canal fall whip club chase idle fiber";
const network = "https://rinkeby.infura.io/v3/9d9db26b6f8f47f5b3f2e04c8ca9f9fa";

const provider = new HDWalletProvider(mnemonic, network);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0] });

    console.log("Contract deployed to", result.options.address);
    provider.engine.stop();
};

deploy();
