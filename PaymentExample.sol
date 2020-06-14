// payment from EOA to contract account : paymentAmount, paymentTime
// balance of contract account : totalBalance, paymentID, paymentIDThatPayment

// getBalance(), sendMoney(), withdrawAllMoney()
pragma solidity ^0.6.0;

contract paymentExample {
	address owner;

	constructor() public {
		owner = msg.sender;
	}

	struct Payment {
		uint paymentAmount;
		uint timestamp;
	}

	struct Balance { //balance received from that EOA to contract account
		uint totalBalance;
		uint paymentID;
		mapping(uint => Payment) payments;
	}

	//teling which EOA account transferred money to this contract account
	// balanceReceived[address] = Balance instance
	mapping(address => Balance) public balanceReceived;

	function getBalance() public view returns(uint) {
		return address(this).balance;
	}

	function sendMoney() public payable{//send money from EOA to contract account, so it is a payable function
		require(msg.sender == owner, "only owner can send money");
		Payment memory payment = Payment(msg.value, now);
		balanceReceived[msg.sender].totalBalance += msg.valuel;
		balanceReceived[msg.sender].payments[paymentID++] = payment; //first return, then ++
		// balanceReceived[msg.sender].paymentID++;  replaced by the above line of code
	}

	function withdrawAllMoney(address payable _to) public{ //send from msg.sender EOA to another EOA directly
		_to.transfer(balanceReceived[msg.sender].totalBalance);
		balanceReceived[msg.sender].totalBalance = 0;
	}

	function withdrawMoeny(address paybale _to, uint _amount) public {
		require(balanceReceived[msg.sender].totalBalance >= _amount, "not enough balance");
		_to.transfer(_amount);
		balanceReceived[msg.sender].totalBalance -= amount
	}

	function getBalance() public view returns(uint){
		return address(this).balance;
	}
}