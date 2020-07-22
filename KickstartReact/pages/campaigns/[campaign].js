import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from '../../components/ContributeForm';

//Props is passed from Index.js that Link with query
//campaign is the address of that campaign
class CampaignShow extends Component {
  
  static async getInitialProps(context) {
      const campaign = Campaign(context.query.campaign);
      //this is indeed an object returned, instead of an array !!!
      const summary = await campaign.methods.getSummary().call();
      return {
          address: context.query.campaign,
          minimumContribution: summary[0],
          balance: summary[1],
          requestsCount: summary[2],
          approversCount: summary[3],
          manager: summary[4]
      };
  }

  renderCards() {
      //copy the values from props
      const {
        balance,
        manager,
        minimumContribution,
        requestsCount,
        approversCount
      } = this.props;
  
      const items = [
        {
          header: manager,
          meta: "Address of Manager",
          description:
            "The manager created this campaign and can create requests to withdraw money",
          style: { overflowWrap: "break-word" }
        },
        {
          header: minimumContribution,
          meta: "Minimum Contribution (wei)",
          description:
            "You must contribute at least this much wei to become an approver"
        },
        {
          header: requestsCount,
          meta: "Number of Requests",
          description:
            "A request tries to withdraw money from the contract. Requests must be approved by approvers"
        },
        {
          header: approversCount,
          meta: "Number of Approvers",
          description:
            "Number of people who have already donated to this campaign"
        },
        {
          header: web3.utils.fromWei(balance, "ether"),
          meta: "Campaign Balance (ether)",
          description:
            "The balance is how much money this campaign has left to spend."
        }
      ];
  
      return <Card.Group items={items} />;
    }
    
    // pass address to props inside the tag
  render(){
    //query cant pass this.props, need to declare outside instead
    //very strange create file for /address/requests. Need to hover over the file icon -> new file, and the the folder wont be in 2 level, or else will get failed
    const {address} = this.props;
    console.log(address);

    return( 
        <Layout>
            <h3>Show</h3>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Link 
                    href={{pathname:"/campaigns/[campaign]/requests", query:{address}}} 
                    as={`/campaigns/${this.props.address}/requests` }
                  >
                    <a>
                      <Button primary>View Requests</Button>
                    </a>
                  </Link>
                </Grid.Column>
              </Grid.Row>
              
              <Grid.Row>
                <Grid.Column width={10}>
                {this.renderCards()}
                </Grid.Column>

                <Grid.Column width={6}>
                  <ContributeForm address={this.props.address}/>
                </Grid.Column>
              </Grid.Row>

            </Grid>
        </Layout>
    );
  }
}

export default CampaignShow;