import React from 'react';
import axios from 'axios';
import AddCall from '../call/AddCall'
import ListOfCalls from '../call/listOfCalls'


class Profile extends React.Component {
    state = {
        user: {},
        listOfCalls: []
    }

    componentDidMount() {
        this.getSingleProfile()
        this.getListOfCall();
    }

    getSingleProfile(){
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_API_URL}/my-profile/${params.id}`, { withCredentials: true })
        .then(responseFromApi => {
            const usersProfile = responseFromApi.data;
            this.setState({user: usersProfile});
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getListOfCall = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/call-list`, {withCredentials: true})
        .then((dataFromDB)=>{
            this.setState({listOfCalls: dataFromDB.data})
          }
        )
    }


    renderAddCallForm = () => {
        return <AddCall userDetails={this.state.user} refreshProfile={()=>this.getSingleProfile()} refreshListOfCalls={()=>this.getListOfCall()}/>
        }

    renderListOfCall = () => {
        return <ListOfCalls userDetails={this.state.user._id} listOfCallsFromState={this.state.listOfCalls}/>
    }


    render() {
        return (
            <div>
                <h1>This is the profile off..</h1>
                <h1>{this.state.user.username}</h1>
                {this.state.user._id === this.props.getUser?._id ?
                    <div>{this.renderListOfCall()} </div>:
                    <div>{this.renderAddCallForm()} </div> 
                }
            </div>
        )
    }
    }


export default Profile