import React from 'react';
import axios from 'axios';
import AddCall from '../call/AddCall'
import ListOfCalls from '../call/listOfCalls'


class Profile extends React.Component {
    state = {}

    componentDidMount() {
        this.getSingleProfile()
    }

    getSingleProfile(){
        const { params } = this.props.match;
        axios.get(`http://localhost:3014/api/my-profile/${params.id}`, { withCredentials: true })
        .then(responseFromApi => {
            const usersProfile = responseFromApi.data;
            this.setState(usersProfile);
        })
        .catch((err) => {
            console.log(err)
        })
    }


    renderAddCallForm = () => {
        return <AddCall userDetails={this.state} refreshProfile={this.getSingleProfile} />
        }

    renderListOfCall = () => {
        return <ListOfCalls userDetails={this.state._id}/>
    }


    render() {
        console.log(this.state)
        return (
            <div>
                <h1>This is the profile off..</h1>
                <h1>{this.state.username}</h1>
                <div>{this.renderAddCallForm()} </div>
                <div>{this.renderListOfCall()} </div>
            </div>
        )
    }
    }


export default Profile