pragma solidity ^0.6.0;

library Search {
    function indexOf(uint[] storage self, uint value) public view returns(uint){
        for(uint i = 0; i < self.length; i++){
            if (self[i] == value) return i;
            return MAX(uint(256));
        }
    }
}

contract UsingExample{
    using Search for uint[];
    uint[] data;

    function usingIndex(uint _value) public view returns(uint){
        return data.indexOf(_value);
    }
}

contract NotUsingExample{
    uint[] data;

    function notUsingIndex(uint _value) public view returns(uint){
        return Search.indexOf(data, _value);
    }
}