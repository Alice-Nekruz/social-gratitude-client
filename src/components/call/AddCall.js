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


    axios.post(`${process.env.REACT_APP_API_URL}/create-call`, { topic, date, amountOfTime, toWhom }, {withCredentials: true})
    .then( () => {
        this.props.refreshProfile();
        this.props.refreshListOfCalls();
        this.setState({topic: "", date: "", amountOfTime: ""});
    })
    .catch( error => {
      console.log(error)
      alert("We had small issue creating your call - please try again")
    })
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }


  render(){
    return(
      <div>
        <h3>Make some time to care for each other</h3>
        <form className="form" onSubmit={this.handleFormSubmit}>
          <label>Topic:</label>
          <input type="text" name="topic" value={this.state.topic} onChange={e => this.handleChange(e)} />
          <label>Date:</label>
          <input type="datetime-local" name="date" value={this.state.date} onChange={e => this.handleChange(e)} />
          <label>Duration:</label>
          <input type="number" name="amountOfTime" value={this.state.amountOfTime} onChange={e => this.handleChange(e)} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddCall;
