import React, { Component } from 'react';
import axios from 'axios';


class CallDetails extends Component {
  state = {}

  componentDidMount(){
    this.getTheCall();
  }

  getTheCall = () => {
    const { params } = this.props.match;
    console.log(params)
    axios.get(`${process.env.REACT_APP_API_URL}/call-details/${params.callid}`, {withCredentials: true})
    .then( responseFromApi =>{
      const theCall = responseFromApi.data;
      this.setState(theCall);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  deleteCall = () => {
    const { params } = this.props.match;
    console.log('params',params)
    axios.delete(`${process.env.REACT_APP_API_URL}/delete-call/${params.callid}`, { withCredentials: true })
        .then(() => {
            this.props.history.push(`/my-profile/${this.props.getUser?._id}`); // !!!         
        })
        .catch((err) => {
            console.log(err)
        })
}

  render(){

    return( 
      <>
        <div>
          <h1>{this.state.topic}</h1>
          <p>{this.state.date}</p>
          <p>{this.state.amountOfTime}</p>
        </div>
        <button onClick={() => this.deleteCall()}>Delete</button>
      </>
    )
  }
}

export default CallDetails
