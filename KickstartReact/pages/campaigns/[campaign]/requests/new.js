import React, { Component } from "react";
import { Button, Table, Form, Label, Input, Message } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import Router from "next/router";

class RequestNew extends Component {
    state = {
        description:'',
        value:'',
        recipient:'',
        loading:false,
        errorMessage:''
    }

    static async getInitialProps(context){
        return { address: context.query.campaign};
    }

    onSubmit = async event => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state;
    
        this.setState({ loading: true, errorMessage: "" });
    
        try {
          const accounts = await web3.eth.getAccounts();
          await campaign.methods
            .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
            .send({ from: accounts[0]});
    
        Router.push(
        "/campaigns/[campaign]/requests",
        `/campaigns/${this.props.address}/requests`
        );

        } catch (err) {
          this.setState({ errorMessage: err.message });
        }
        this.setState({loading: false});
    };
   
    render() {
        return (
            <Layout>
                <Link 
                    href={{pathname:"/campaigns/[campaign]/requests"}} 
                    as={`/campaigns/${this.props.address}/requests/` }
                    >
                    <a>Back</a>
                </Link>
                <h3>Create Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <Label>Description</Label>
                        <Input
                            value={this.state.description}
                            onChange={event => {
                                this.setState({description: event.target.value})
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Label>Value in Ether</Label>
                        <Input
                            value={this.state.value}
                            onChange={event => {
                                this.setState({value: event.target.value})
                            }}
                        />
                    </Form.Field>
                    
                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                        value={this.state.recipient}
                        onChange={event =>
                            this.setState({ recipient: event.target.value })
                        }
                        />
                    </Form.Field>

                    <Message error header="Error!"  content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;