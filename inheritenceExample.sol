pragma solidity ^0.6.0;

import "./owned.sol";

contract InheritenceExample is Owned {
    // mapping
    // uint tokenprice
    // constructor with tokenbalance
    // createtoken
    // burntoken
    // purchasetoken
    // sentoken from one address to another address
    
    mapping (address => uint) public tokenBalance;
    uint tokenPrice = 1 ether;

    constructor() public {
        tokenBalance[owner] = 100;
    }

    function createToken() public onlyOwner{
        tokenBalance[owner] ++;
    }

    function burnToken() public onlyOwner{
        tokenBalance[owner] --;
    }

    function purchaseToken() public payable{
        require(tokenBalance[owner] >= tokenPrice * msg.value, "Owner not enough token");
        tokenBalance[owner] -= msg.value / tokenPrice ;
        tokenBalance[msg.sender] += msg.value / tokenPrice ;
    }

    event tokenSent(address _from, address _to, uint _amount);

    function transferToken(address _to) public{
        uint value = tokenBalance[msg.sender];
        tokenBalance[msg.sender] = 0;
        tokenBalance[_to] = value;
        emit tokenSent(msg.sender, _to, value);
        //these results will be shown in log
    }

    
}