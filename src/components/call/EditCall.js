import React, { Component } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import './style/call.css'

class EditCall extends Component {
  state = {
    topic: this.props.theCalltoEdit.topic, 
    date: this.props.theCalltoEdit.date,
    amountOfTime: this.props.theCalltoEdit.amountOfTime,
    isToggle: false
  }
  
  handleFormSubmit = (event) => {
    const topic = this.state.topic;
    const date = this.state.date;
    const amountOfTime = this.state.amountOfTime;

    event.preventDefault();

    axios.put(`${process.env.REACT_APP_API_URL}/edit-call/${this.props.theCalltoEdit?._id}`, { topic, date, amountOfTime }, { withCredentials: true })
    .then( () => {
        this.props.refreshCallList();
        alert("Your call has successfully been updated!")
    })
    .catch( error => {
      console.log(error)
      alert("We had a small issue updating the information of your call - please try again.")
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
}

  handleClick = () => {
    this.setState(prevState => ({
      isToggle: !prevState.isToggle
    }));
  }

  render(){
    return (
      <div>
        {!this.state.isToggle &&
          <Button className="edit-button" onClick={this.handleClick} variant="contained" color="secondary">
            Edit
          </Button>}
          {this.state.isToggle &&
                  <form onSubmit={this.handleFormSubmit}>
          <label>Topic:</label>
          <input type="text" name="topic" value={this.state.topic} onChange={e => this.handleChange(e)} />
          <label>Date:</label>
          <input type="date" name="date" value={this.state.date} onChange={e => this.handleChange(e)} />
          <label>amountOfTime:</label>
          <input type="number" name="amountOfTime" value={this.state.amountOfTime} onChange={e => this.handleChange(e)} />
          <input type="submit" value="Submit" />
        </form>
          }
      </div>
    )
  }
}

export default EditCall;
