import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import Campaign from "../../../../ethereum/campaign";
import RequestRow from "../../../../components/RequestRow";

class RequestIndex extends Component {
    static async getInitialProps(context){
        const address = context.query.campaign;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        //video 205 ; https://www.freecodecamp.org/news/promise-all-in-javascript-with-example-6c8c5aea3e32/
        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );

        return {
            address: context.query.campaign,
            requests,
            requestCount,
            approversCount
        };
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return  (
                <RequestRow
                    key={index}
                    id={index}
                    request={request}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                />
            )
        })
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        const {address} = this.props.address;
        return (
            <Layout>
                <h3>requessdsst!</h3>
                <Link 
                    href={{pathname:"/campaigns/[campaign]/requests/new"}} 
                    as={`/campaigns/${this.props.address}/requests/new` }
                >
                    <a>
                        <Button primary floated="right" style={{ marginBottom: 10 }}> New Request</Button>
                    </a>
                </Link>

                <Table>
                <Header>
                    <Row>
                    <HeaderCell>ID</HeaderCell>
                    <HeaderCell>Description</HeaderCell>
                    <HeaderCell>Amount</HeaderCell>
                    <HeaderCell>Recipient</HeaderCell>
                    <HeaderCell>Approval Count</HeaderCell>
                    <HeaderCell>Approve</HeaderCell>
                    <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>{this.renderRows()}</Body>
                </Table>
                <div>Found {this.props.requestCount} requests.</div>
            </Layout>
        );
    }
}

export default RequestIndex;

