const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8").toString();


const input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source
    }
  },
settings: {
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = output.contracts["Inbox.sol"].Inbox; //immediate access to inbox 

console.log(output);

//interface = abi
//bytecode = machine code, use for new deploy instance
