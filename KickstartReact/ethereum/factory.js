// factory sol is deployed to the net, campaign sol is compiled but not deployed to net yet
// this script = return the factory instance for future use

import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    CampaignFactory.abi, 
    "0xd672E2deea44e3f411EF2a55cC4449633196433E"    //deployed factory address
)

export default instance;
