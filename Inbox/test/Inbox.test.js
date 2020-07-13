const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = Web3.provider || ganache.provider();
const web3 = new Web3(provider);
const {abi, evm} = require('../compile')

beforeEach(() =>{
    web3.eth.getAccounts()
        .then(fetchedAccounts =>{
            console.log(fetchedAccounts);
        });
});

describe('Inbox', () =>{
    it('deploy', () => {

    });
});
