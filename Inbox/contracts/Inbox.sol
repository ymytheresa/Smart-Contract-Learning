// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.7.0;
// pragma solidty ^0.6.1; //0.5.xx supported only now i guess

contract Inbox {
    string public message;

    constructor(string memory initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    
}
