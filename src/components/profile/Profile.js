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
        console.log(this.state.listOfCalls)
        console.log(this.renderListOfCall())
        return (
            <div>
                {this.state.user._id === this.props.getUser?._id ?
                    <h1>Welcome to your profile</h1>
                    : <h1> This is the profile of</h1>
                }
                <h2>{this.state.user.username}</h2>
                <p>But their real name is <b>{this.state.user.name}</b>,</p>
                <p>and they are a {this.state.user.gender} person.</p>
                <p>They really love {this.state.user.hobbies}!</p>
                {this.state.user.imageUrl &&
                <><h3>Here is how they might look like</h3>
                <img src={this.state.user.imageUrl} alt="" /></>}
                
                {this.state.user._id === this.props.getUser?._id ?
                    <div>{this.renderListOfCall()} </div>
                    : <div>{this.renderAddCallForm()} </div> 
                }
            </div>
        )
    }
    }


export default Profile