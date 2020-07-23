import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from "semantic-ui-react";
import Layout from '../components/Layout';
// import Link from '../routes'
import Link from "next/link";

class CampaignIndex extends Component {
    // fetching data on next is different. next render the getInitialProps first and provide to the index
    //CAMPAIGNS itself is a contract, so the return value is a list of addresses
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    //fluid : scratch the box max length of the div
    //Link as, built in properties. Used for dynamic routing
    //CAMPAIGN (an array of campaign). (an array of address)
    //campaign is sent to props of Link (address of that campaign) !!https://linguinecode.com/post/complete-guide-to-navigation-with-next-js-links!! query to send props
    //the file name for rerouting must be inside [], or else refresh will cause link broken
    renderCampaigns() {
        const items = this.props.campaigns.map(campaign => {
            return {
                header: campaign,
                description: (
                    <Link href={{pathname:"/campaigns/[campaign]"}} as={`/campaigns/${campaign}` }>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
            }; 
        })
        //without next line wont display anything
        return <Card.Group items={items} />;
    }

    render(){
        return(
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>
                    <Link href="/campaigns/new">
                        <a>
                            <Button 
                                content="Create Campaign" 
                                icon="add circle" 
                                primary
                                floated="right"
                            />
                        </a>    
                    </Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
            );
    }
}

export default CampaignIndex;