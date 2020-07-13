pragma solidity ^0.6.0;

contract Owned {
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner{ //no bracket since there should be no parameter
        require(msg.sender == owner, "permisson denied");
        _;
    }
}
