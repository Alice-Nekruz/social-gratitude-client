import React, { Component } from 'react';
import axios from 'axios';

class AddCall extends Component {
  state = { 
    topic: "", 
    date: "", 
    amountOfTime: "",
    toWhom: ""
  }

   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const topic = this.state.topic;
    const date = this.state.date;
    const amountOfTime = this.state.amountOfTime;
    const toWhom = this.props.userDetails;


    axios.post("http://localhost:3014/api/create-call", { topic, date, amountOfTime, toWhom }, {withCredentials: true})
    .then( () => {
        this.props.refreshProfile();
        this.setState({topic: "", date: "", amountOfTime: ""});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }


  render(){
    return(
      <div>
        <h3>Add Call</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Topic:</label>
          <input type="text" name="topic" value={this.state.topic} onChange={e => this.handleChange(e)} />
          <label>Date:</label>
          <input type="date" name="date" value={this.state.date} onChange={e => this.handleChange(e)} />
          <label>amountOfTime:</label>
          <input type="number" name="amountOfTime" value={this.state.amountOfTime} onChange={e => this.handleChange(e)} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddCall;
