import React from 'react';
import axios from 'axios';
import AddCall from '../call/AddCall'
import ListOfCalls from '../call/listOfCalls'
import './profile.css';
import backgroundPhoto from '../../photos/Background_photo.png'
import PersonIcon from '@mui/icons-material/Person';
import WcIcon from '@mui/icons-material/Wc';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

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
                                <h3>Welcome to your profile!</h3>
                                <p><PersonIcon color="secondary"/> Name: <b>{this.state.user.name}</b></p>
                                <p><WcIcon color="secondary"/> Gender: {this.state.user.gender}</p>
                                <p><SportsSoccerIcon color="secondary"/> Hobbies: {this.state.user.hobbies}!</p>
                            </div>
                        </>    
                        : 
                        <>
                            <div className="info-profile">
                            <h3>This is the profile of {this.state.user.username}</h3>
                                <p><PersonIcon color="secondary"/> Name: <b>{this.state.user.name}</b></p>
                                <p><WcIcon color="secondary"/> Gender: {this.state.user.gender}</p>
                                <p><SportsSoccerIcon color="secondary"/> Hobbies: {this.state.user.hobbies}!</p>
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