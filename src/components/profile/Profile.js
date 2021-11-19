import React from 'react';
import axios from 'axios';
import AddCall from '../call/AddCall'
import ListOfCalls from '../call/listOfCalls'
import './profile.css';
import backgroundPhoto from '../../photos/Background_photo.png'

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
                <div className="profileCover">
                    <img className="profileCoverImg" src={backgroundPhoto} alt="" />
                    {this.state.user.imageUrl && <img className="profileUserImg" src={this.state.user.imageUrl} alt="" />}
                </div>


                <div className="my-profile-main">
                    {this.state.user._id === this.props.getUser?._id ?
                        <>
                            <div className="info-profile">
                                <h3>Welcome to my profile!</h3>
                                <p>Name: <b>{this.state.user.name}</b>,</p>
                                <p>Gender: {this.state.user.gender}</p>
                                <p>Hobbies: {this.state.user.hobbies}!</p>
                                {/* <h1>Welcome to my profile!</h1>
                                <p>My name is <b>{this.state.user.name}</b>,</p>
                                <p>and I am are a {this.state.user.gender} person.</p>
                                <p>I really love {this.state.user.hobbies}!</p> */}
                            </div>
                        </>    
                        : 
                        <>
                            <div className="info-profile">
                                <h1> This is the profile</h1>
                                <h2>of {this.state.user.username}</h2>
                                <p>But their real name is <b>{this.state.user.name}</b>,</p>
                                <p>and they are a {this.state.user.gender} person.</p>
                                <p>They really love {this.state.user.hobbies}!</p>
                            </div>
                        </>
                    }

                    
                    {this.state.user._id === this.props.getUser?._id ?
                        <div className="calls-list">{this.renderListOfCall()} </div>
                        : <div className="calls-list">{this.renderAddCallForm()} </div> 
                    }
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
    }


export default Profile