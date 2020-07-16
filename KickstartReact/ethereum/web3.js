import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider);//assume ppl are using metamask installed, will improve

export default web3;