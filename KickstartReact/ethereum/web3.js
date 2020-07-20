import Web3 from 'web3';

// const web3 = new Web3(window.web3.currentProvider);//window is skipped on the next server
//localhost:3000 -> console -> typeof window -> "object" (on browser)
//terminal: node -> typeof window -> undefined (on server)
let web3;
if (typeof window !== 'undefined' && 
    typeof window.web3 !== 'undefined'){
    //we are in the browser , and web3 is injected by
    //use brave crypto wallet. metamask is not injecting 
    web3 = new Web3(window.web3.currentProvider);
} else {
    //on server OR no metamask
    //make our own provider
    const provider = new Web3(new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/9d9db26b6f8f47f5b3f2e04c8ca9f9fa"
    ));
    web3 = new Web3(provider);
}

// const provider = new Web3.providers.HttpProvider(
//     "https://rinkeby.infura.io/v3/9d9db26b6f8f47f5b3f2e04c8ca9f9fa"
// );
// web3 = new Web3(provider);

export default web3;