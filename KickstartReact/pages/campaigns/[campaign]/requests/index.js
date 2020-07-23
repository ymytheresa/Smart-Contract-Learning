import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import Campaign from "../../../../ethereum/campaign";
// import RequestRow from "../../../../components/RequestRow";

class RequestIndex extends Component {
    static async getInitialProps(context){
        const address = context.query.campaign;
        console.log(context.query);
        const campaign = Campaign(address);
        return {
            address: context.query.campaign
        };
    }
    render() {
        const {address} = this.props.address;
        return (
            <Layout>
                <h3>request!</h3>
                <Link 
                    href={{pathname:"/campaigns/[campaign]/requests/new"}} 
                    as={`/campaigns/${this.props.address}/requests/new` }
                >
                    <a>
                        <Button primary>View Requests</Button>
                    </a>
                </Link>
            </Layout>
        );
    }
}

export default RequestIndex;