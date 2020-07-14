const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = Web3.provider || ganache.provider();
const web3 = new Web3(provider);
const {abi, evm} = require('../compile')    //properties

const message = 'Hi there!';
let accounts;
let inbox;

beforeEach(async () =>{
    accounts = await web3.eth.getAccounts(); //wait for the request to be completed

    inbox = await new web3.eth.Contract(abi)//create new contract,telling the compiler there is a contract we can use. No info of this contract is passed here
        .deploy({data: "0x" + evm.bytecode.object, arguments:[message]})//constructor with argument, start transaction
        .send({from: accounts[0], gas: '1000000'})//use which account and gas fee, start communication from web3 to the network
});

describe('Inbox', () =>{
    it('deploys a contract', () => {
        assert.ok(inbox.options.address); //assert.ok if it exists
    });

    it("has a default message", async () => {
        const msg = await inbox.methods.message().call();
        assert.equal(msg, message);
    });
    
    it("can change the message", async () => {
        const newMsg = "bye";
        await inbox.methods.setMessage(newMsg).send({ from: accounts[0] });
    
        const msg = await inbox.methods.message().call();
        assert.equal(msg, newMsg);
    });
});
