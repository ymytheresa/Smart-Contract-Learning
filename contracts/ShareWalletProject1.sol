pragma solidity ^0.6.1;

contract SharedWalletAttempt{
    address owner;
    uint coinPrice;
    uint allowance;
    mapping(address => uint) balanceOfAccounts;

    constructor() public{
        owner = msg.sender;
        coinPrice = 1 ether;
        allowance = 1;
    }

    receive() external payable{
        depositFunds();
    }

    modifier onlyOwner{
        require(msg.sender == owner, "only can owner do this");
        _;
    }
    
    event getBal(uint value);

    function depositFunds() public payable{
        balanceOfAccounts[msg.sender] += msg.value / coinPrice;    
    }   

    function withdrawAllMoney() public {
        if(msg.sender == owner){
            balanceOfAccounts[msg.sender] = 0;
        }else{
            balanceOfAccounts[msg.sender] -= allowance;
        }
    }

    function changeAllowance(uint _value) public onlyOwner{
        allowance = _value;
    }
    
    function getBalance() public{
        emit getBal(balanceOfAccounts[msg.sender]);
    }
    
}
    