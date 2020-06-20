pragma solidity ^0.6.0;

contract ErrorHandling{
    mapping(address => uint64) public balanceReceived;

    function receiveMoney() public payable{
        assert(balanceReceived[msg.sender]+ uint64(msg.value) >= balanceReceived[msg.sender]);
        balanceReceived[msg.sender] += uint64(msg.value);
    }

    function withdrawMoeny(address payable _to, uint _amount) public {
        // THIS SHOULD BE REQUIRE!!!
        // assert(balanceReceived[msg.sender] - _amount >= 0);
        require(balanceReceived[msg.sender] >= _amount);
        // this condition should not happen but need it to check
        assert(balanceReceived[msg.sender] - _amount <= balanceReceived[msg.sender]);
        _to.transfer(_amount);
        balanceReceived[msg.sender] -= uint64(_amount); //mapping need uint64 type
    }

    function execute() public{
        try externalContract.someFunction.gas(20)(){
            //change the gas limit to 20 
            }
            catch (bytes memory returnData){
                emit ReturnDataEvent(returnData);
            }
        }
    }
}