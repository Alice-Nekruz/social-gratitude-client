import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './style/call.css'
import Button from '@mui/material/Button';


class ListOfCalls extends Component {
   

    render() {
        return (
            <div className="call-list">
                <h3>Here you can find all the calls you scheduled</h3>
                <div className="call-list-inside">
                    {this.props.listOfCallsFromState.map(calls => { 
                        if(calls.owner === this.props.userDetails){

                            return (
                                <div className="callContainer">
                                    <div key={calls._id}>
                                        <h3>{calls.topic}</h3>
                                    </div>
                                    <Button variant="contained" color="secondary">
                                        <Link className="text-details" to={`/call-details/${calls._id}`}>Details</Link>
                                    </Button>
                                </div>
                            )
                        } 
                        
                    })}
                </div>
            </div>
        )
    }
}

export default ListOfCalls