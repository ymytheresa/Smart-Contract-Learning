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

    modifier isOwner{
        require(msg.sender == owner, "not owner");
        _;
    }

    modifier isEnough(uint _amount){
        require(allowances[msg.sender] >= _amount, "not enough");
        _;
    }

    function setAllowance(address _to, uint _amount) public isOwner{
        emit allowanceChanged(owner(), _to, allowances[_to], allowances[_to]+_amount);
        allowances[_to] += _amount;
    }

    function reduceAllowance(address _to, uint _amount) public isEnough(_amount){
        allowances[_to] -= _amount;
    }
}

contract SharedWallet is Ownable, Allowance{
    receive() external payable{

    }

    function withdrawMoeny(address payable _to, umsg.sender _amount) public isEnough(_amount){
        require(address(this).balance >= _amount, "not enough balance");
        if(msg.sender != owner()){
            reduceAllowance(_to, _amount);
        }
        _to.transfer(_amount);
    }
}
