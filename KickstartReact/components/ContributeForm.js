import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import Router from 'next/router';

class ContributeForm extends Component {
  state = {
    value:'', //input is string
    errorMessage:'',
    loading: false  //when onSubmit and before created campaign, loading=true , change button. when error/done, loading=false, chanch back button
  }

  onSubmit = async event => {
    event.preventDefault();

    //props send from show.js <ContributeForm address=xxx>
    const campaign = Campaign(this.props.address);
    this.setState({loading:true, errorMessage:''},);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from:accounts[0],
        value: web3.utils.toWei(this.state.value,"ether")
      });

      //auto refresh after completion
      Router.replace(
        "/campaigns/[campaign]",
        `/campaigns/${this.props.address}`
      );
      
    } catch (error) {
      this.setState({errorMessage: error.message});
    };

    this.setState({loading:false, value:''})
  }

  render(){
      return(
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Amount</label>
            <Input
              value={this.state.value}
              label="ether"
              labelPosition="right"
              onChange={event => this.setState({value: event.target.value})}
            />
          </Form.Field>
          <Message error header="Error!" content={this.state.errorMessage}/>
          <Button primary loading={this.state.loading}>
            Contribute!
          </Button>
      </Form>
      );
  }
}

export default ContributeForm;