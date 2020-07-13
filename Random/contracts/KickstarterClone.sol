pragma solidity >=0.5.0 <0.7.0;


contract ContractFactory{
    address manager;
    address[] deployedContracts;

    function createContract(uint minimum) public{
        address owner = msg.sender;
        address newCampaign = new Campaign(minimum, owner);
        deployedContracts.push(newCampaign);
    }

    function getDeployedContracts() public view returns(address[] memeory) {
        return deployedContracts;
    }
}

contract Campaign{
    
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    uint approversCount;
    mapping(address => bool) approvers; //bool refers to if really donated **bool default behavior is false**
    Request[] public requests;


    modifier restricted{
        require(msg.sender == manager, "only manager");
        _;
    }

    constructor(uint minimum, address owner) public {
        manager = owner;
        minimumContribution = minimum; 
    }

    function contribute() public payable{
        require(msg.value >= minimumContribution, "not enough amount");
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address payable recipient) public restricted{
        require(approvers[msg.sender] == true, "not contributed");
        // mapping(address => bool) memory newApproval; idk
        Request memory requestItem = Request(description, value, recipient, false,0); //must be memory, read Notion note 
        requests.push(requestItem);
    }

    function approveRequest(uint index) public{
        Request storage targetRequest = requests[index];//reference type, so use storage

        require(approvers[msg.sender]);
        require(!targetRequest.approvals[msg.sender]);
        targetRequest.approvals[msg.sender] = true;
        targetRequest.approvalCount++;

    }

    function finalizeRequest(uint index) public restricted{
        Request storage targetRequest = requests[index];

        require(!targetRequest.complete);
        require(targetRequest.approvalCount > (approversCount / 2));

        targetRequest.complete = true;
        targetRequest.recipient.transfer(targetRequest.value);
    }

}

