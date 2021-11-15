
import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

import AddCall from '../call/AddCall'


class Profile extends Component {
    
    state = {}

    componentDidMount() {
        this.getSingleProfile()
    }

    getSingleProfile(){
        // const theID = this.props.match.params.id;
        // console.log(theID)
        axios.get(`http://localhost:3014/api/my-profile`, { withCredentials: true })
        .then(responseFromApi => {
            const theProfile = responseFromApi.data;
            console.log("----->>>",responseFromApi.data)
            this.setState(theProfile);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderAddTaskForm = () => {
        if (!this.state.username) {
            // this.getSingleProfile();
        } else {
            // pass the project and method getSingleProject() as a props down to AddTask component
            return <AddCall theCall={this.state} getTheCall={this.getSingleProfile} />
        }
    }


    render(){
        return(
            <div>
                <h1>{this.state.username}</h1>
                <p>{this.state.password}</p>
                <p>{this.state._id}</p>
                <div>{this.renderAddTaskForm()} </div>


            </div>
        )
    }

}

export default Profile