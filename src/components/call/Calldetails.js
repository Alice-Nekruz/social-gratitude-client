// components/tasks/TaskDetails.js

import React, { Component } from 'react';
import axios from 'axios';


class CallDetails
 extends Component {
  state = {}

  componentDidMount(){
    this.getTheCall();
  }

  getTheCall = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:3014/api/call-details/${params.callid}/tasks/${params.callid}`)
    .then( responseFromApi =>{
      const theCall = responseFromApi.data;
      this.setState(theCall);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  render(){
    return(
      <div>
        <h1>{this.state.topic}</h1>
        <p>{this.state.date}</p>
        <p>{this.state.amountOfTime}</p>
      </div>
    )
  }
}

export default CallDetails
;
