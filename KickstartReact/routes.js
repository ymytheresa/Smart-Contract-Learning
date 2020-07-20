const routes = require('next-routes')();    //dynamic routes 

// being replaced by next/link
routes
    .add('/campaign/new', '/campaign/new')  //ensure /campaign/new wont be remappping to show
    .add('/campaigns/:address', '/campaigns/show');   //remapping from :address to show 

//will need to set up a server for handling tht dynamic routes
module.exports = routes;

