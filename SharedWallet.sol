pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";

// withdrawMoney()
// receive()
// mapping
// addAllowance
// modifier
// reduceAllowance(owner no need )
// => separate contracts
// events in change in allowance
// events in money changed
// safemath library
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/math/SafeMath.sol";
// remove renounceOwnership() 
// seperate sol files

contract Allowance is Ownable{
    mapping(address => uint) allowances;
    event allowanceChanged(address indexed _from, address indexed _to, uint _toOldAmount, uint _toNewAmount);

    modifier ownerOrAllowed(uint _amount){
        require(msg.sender == owner() || _amount <= allowances[msg.sender], "not allowed");
        _;
    }

    function addAllowance(address _to, uint _amount) public ownerOrAllowed(_amount){
        allowances[_to] += _amount;
        emit allowanceChanged(msg.sender, )
    }

    function reduceAllowance(address _to, uint _amount) public ownerOrAllowed(_amount){
        allowances[_to] -= _amount;
    }
}

contract SharedWallet is Ownable, Allowance{
    receive() external payable{

    }

    function withdrawMoeny(address payable _to, umsg.sender _amount) public ownerOrAllowed(_amount){
        require(address(this).balance >= _amount, "not enough balance");
        if(msg.sender != owner()){
            reduceAllowance(_to, _amount);
        }
        _to.transfer(_amount);
    }
}
