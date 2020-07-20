// factory sol is deployed to the net, campaign sol is compiled but not deployed to net yet
// this script = return the factory instance for future use

import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    CampaignFactory.abi, 
    "0x04fDa1e98B8aaD0cDC284a194A21c8B7DD45C747"    //deployed factory address
)

export default instance;
