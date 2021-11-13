
import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

import AddCall from '../call/AddCall'


class Profile extends Component {
    
    state = {}

    // state = {
    //     username: '',
    //     password: '',
    // }

    componentDidMount() {
        this.getSingleProfile()
    }

    getSingleProfile(){
        const { params } = this.props.match;
        console.log(params)
        // const profileID = '618fc4424fe506616bc6f21f';

        axios.get(`http://localhost:3014/api/my-profile/${params.id}`, { withCredentials: true })
        .then(responseFromApi => {
            const theProject = responseFromApi.data;
            this.setState(theProject);
            // const usernameFromDB = responseFromApi.data.username
            // const passwordFromDB = responseFromApi.data.password
            // this.setState({
            //     username: usernameFromDB,
            //     password: passwordFromDB
            // });
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderAddTaskForm = () => {
        if (!this.state.username) {
            this.getSingleProfile();
        } else {
            // pass the project and method getSingleProject() as a props down to AddTask component
            return <AddCall theCall={this.state} getTheCall={this.getSingleProfile} />
            // return <AddCall theProject={this.state} getTheProject={this.getSingleProfile} />
        }
    }


    render(){
        return(
            <div>
                <h1>{this.state.username}</h1>
                <p>{this.state.password}</p>
                <div>{this.renderAddTaskForm()} </div>


            </div>
        )
    }

}

export default Profile