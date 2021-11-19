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
    axios.delete(`${process.env.REACT_APP_API_URL}/delete-call/${params.callid}`, { withCredentials: true })
        .then(() => {
          alert("Your call has successfully been removed")
          this.props.history.push(`/my-profile/${this.props.getUser?._id}`);     
        })
        .catch((err) => {
          alert("There was a problem deleting your call")
          console.log(err)
        })
}

  timeConverter = (timestamp) => {
    const result = timestamp.split('')
    let year = []
    year.push(result[0], result[1], result[2], result[3])
    const newYear = year.join('')


    const month = []
    month.push(result[5], result[6])
    const newMonth = month.join('')

    const day = []
    day.push(result[8], result[9])
    const newDay = day.join('')

    const date = []
    date.push(newDay, newMonth, newYear)
    const newDate = date.join('.')

    return newDate;
  }

  render(){

    return( 
      <div className="details-wrapper">
        <div className="detail-delete-info">
          <h1>{this.state.topic}</h1>
          <p>This call is scheduled for the {this.timeConverter(`${this.state.date}`)}</p>
          <p>It is planed in for {this.state.amountOfTime} hours</p>
        {/* <button onClick={() => this.deleteCall()}>Delete</button> */}
        <Button className="delete-button" onClick={() => this.deleteCall()} variant="outlined" color="secondary" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </div>

        <div>{this.EditCallForm()} </div>
      </div>
    )
  }
}

export default CallDetails
