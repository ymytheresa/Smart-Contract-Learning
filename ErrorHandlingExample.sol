pragma solidity ^0.6.0;

contract ErrorHandling{
    mapping(address => uint) public balanceReceived;

    function receiveMoney() public payable{
        assert(balanceReceived[msg.sender]+msg.value >= balanceReceived[msg.sender]);
        balanceReceived[msg.sender] += msg.value;
    }

    function withdrawMoeny(address payable _to, uint _amount) public {
        assert(balanceReceived[msg.sender] - _amount >= 0);
        _to.transfer(_amount);
        balanceReceived[msg.sender] -= _amount;
    }
}