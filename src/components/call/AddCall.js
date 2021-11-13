// components/tasks/AddCall.js

import React, { Component } from 'react';
import axios from 'axios';

class AddCall extends Component {
  state = { 
    topic: "", 
    date: "", 
    amountOfTime: "", 
    isShowing: false } // `isShowing` will help us to toggle add task form
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const topic = this.state.topic;
    const date = this.state.date;
    const amountOfTime = this.state.amountOfTime;
    const owner = this.props.theCall._id; 
    //const owner = this.props.theProject._id; // <== we need to know to which project the created task belong, so we need to get its 'id'
                                                // it has to be the 'id' because we are referencing project 
                                                // by its id in the task model on the server side ( project: {type: Schema.Types.ObjectId, ref: 'Project'})
    
    // { title, description, projectID } => this is 'req.body' that will be received on the server side in this route, 
    // so the names have to match
    axios.post("http://localhost:3014/api/create-call", { topic, date, amountOfTime, owner })
    .then( () => {
          // after submitting the form, retrieve project one more time so the new task is displayed as well 
          //              |
        this.props.getTheCall();
        this.setState({topic: "", date: "", amountOfTime: ""});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  toggleForm = () => {
      if(!this.state.isShowing){
          this.setState({isShowing: true});
      } else {
        this.setState({isShowing: false});
      }
  }

  showAddCallForm = () => {
    if(this.state.isShowing){
        return(
            <div>
                  <h3>Add Task</h3>
                  <form onSubmit={this.handleFormSubmit}>
                    <label>Topic:</label>
                    <input type="text" name="topic" value={this.state.topic} onChange={ e => this.handleChange(e)}/>
                    <label>Date:</label>
                    <textarea name="date" value={this.state.date} onChange={ e => this.handleChange(e)} />
                    <label>amountOfTime:</label>
                    <textarea name="amountOfTime" value={this.state.amountOfTime} onChange={ e => this.handleChange(e)} />
                    <input type="submit" value="Submit" />
                  </form>
            </div>
          )
    }
  }

  render(){
    return(
      <div>
            <hr />
            <button onClick={() => this.toggleForm()}> Add task </button>
            { this.showAddCallForm() }
      </div>
    )
  }
}

export default AddCall;
