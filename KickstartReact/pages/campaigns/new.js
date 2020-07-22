import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import Router from 'next/router';

class CampaignNew extends Component{

    //need to update state, why? only updating the state will rerender the components
    state = {
        minimumContribution:'', //input is string
        errorMessage:'',
        loading: false  //when onSubmit and before created campaign, loading=true , change button. when error/done, loading=false, chanch back button
    }

    //parathesis is not passed since if passed the function will be triggered once load. reference is passed instead
    onSubmit = async (event) => {
        event.preventDefault(); //prevent default behavior <-- submit the data to backend
        this.setState({loading: true, errorMessage:''});
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });
            this.setState({loading: false});

            //after successful created campaign, redirect to another link, home page
            Router.push('/');
        } catch (error) {
            this.setState({errorMessage: error.message});
            this.setState({loading: false});
        }
    };

    //error={} <-- expected receiving bool, so we give (false(false(1))) -> will give 1
    //need <Message> tag here to print the error message 
    //button loading property
    render() {
        return (
            <Layout>
                <h3>Create new campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}> 
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label="wei" 
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event => 
                                this.setState({minimumContribution: event.target.value})}
                        />
                    </Form.Field>

                    <Message error header="Error!"  content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew;