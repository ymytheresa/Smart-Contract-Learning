pragma solidity ^0.6.0;

// mapping
// receiveMoney()
// withdrawMoney()

contract FunctionsExample{
    mapping (address => uint) public balanceReceived;
    address payable owner;//the address need to be payable here, since need to destory the smart contact and gives all the remaining balance to this address

    constructor() public{
        owner = msg.sender;
    }

    function receiveMoney() public payable{
        assert(balanceReceived[msg.sender] <= balanceReceived[msg.sender] + msg.value);
        balanceReceived[owner] += msg.value;
    }

    function withdrawMoeny(address payable _to, uint _amount) public {
        require(_amount <= balanceReceived[msg.sender]);
        assert(balanceReceived[msg.sender] <= balanceReceived[msg.sender] - _amount);
        _to.transfer(_amount);
        balanceReceived[msg.sender] -= _amount;
    }

    receive() external payable{
        receiveMoney();
    }

    function destroySmartContract() public {
        require(msg.sender == owner, "only can owner destory the contract");
        selfdestruct(owner);
    }

    function getOwner() public view returns(address){
        return owner;
    }

    function convert(uint a, uint b) public pure returns(uint){
        return a/b;
    }
} 