import React, { Component } from 'react'
import axios from 'axios';



class ListOfCalls extends Component {
    state = {
        listOfCalls: []
    }

    getListOfCall = () => {
        axios.get(`http://localhost:3014/api/call-list`, {withCredentials: true})
        .then((dataFromDB)=>{
            console.log(dataFromDB.data)
            this.setState({listOfCalls: dataFromDB.data})
          }
        )
    }

    componentDidMount() {
        this.getListOfCall();
      }

    render() {
        return (
            <div>
                <h1>Hellow</h1>
                
                {this.state.listOfCalls.map(calls => { 
                    if(calls.owner === this.props.userDetails){

                        return (
                            <div key={calls._id}>
                                <h3>{calls.topic}</h3> 
                                <p>{calls._id}</p> 
                            </div>
                        )
                    } else {
                        return('You dont have any call')
                    }
                        
                })}
            </div>
        )
    }
}

export default ListOfCalls