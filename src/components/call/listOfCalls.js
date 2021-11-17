import React, { Component } from 'react'
import {Link} from 'react-router-dom'



class ListOfCalls extends Component {
   

    render() {
        return (
            <div>
                <h1>Hellow</h1>
                
                {this.props.listOfCallsFromState.map(calls => { 
                    if(calls.owner === this.props.userDetails){

                        return (
                            <div className="callContainer">
                                <div key={calls._id}>
                                    <h3>{calls.topic}</h3> 
                                    <p>{calls._id}</p> 
                                </div>
                                <Link to={`/call-details/${calls._id}`}>Details</Link>
                            </div>
                        )
                    } 
                    
                })}
            </div>
        )
    }
}

export default ListOfCalls