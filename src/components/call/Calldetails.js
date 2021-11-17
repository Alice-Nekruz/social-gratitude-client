import React, { Component } from 'react';
import axios from 'axios';
import EditCall from './EditCall'

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';



class CallDetails extends Component {
  state = {}

  componentDidMount(){
    this.getTheCall();
  }

  getTheCall = () => {
    const { params } = this.props.match; // to get ID from URL
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

  EditCallForm = () => {
    if (this.state.topic) {
        return <EditCall theCalltoEdit={this.state} refreshCallList={this.getTheCall} {...this.props} />

      }
    }



  deleteCall = () => {
    const { params } = this.props.match;
    console.log('deletecall---->',params)
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
        {/* <button onClick={() => this.deleteCall()}>Delete</button> */}
        <Button onClick={() => this.deleteCall()} variant="outlined" color="secondary" startIcon={<DeleteIcon />}>
        Delete
      </Button>

        <div>{this.EditCallForm()} </div>
      </>
    )
  }
}

export default CallDetails
