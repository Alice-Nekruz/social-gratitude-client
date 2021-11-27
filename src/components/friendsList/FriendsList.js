import React from 'react';
import axios from 'axios';
import './style.css'
import backgroundPhoto from '../../photos/Background_photo.png'
import defaultImg from '../../img/default-image-profile.png'
import {Button} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';
import WcIcon from '@mui/icons-material/Wc';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

import { Link } from 'react-router-dom';

class FriendList extends React.Component {
    state = {
        friendList: []
    }

    getFriendList = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/friend-list`, {withCredentials: true})
        .then(listOfUsersFromAPI => {
            this.setState({
                friendList: listOfUsersFromAPI.data
            })
        })
    }

    componentDidMount(){
        this.getFriendList()
    }

    render(){
        return(
            <div className="friend-list">
                {this.state.friendList.map(user => {
                    return(
                        <div className="user">
                            <div>
                                {user.imageUrl ?
                                <img src={user.imageUrl} alt="sd"/> :
                                <img src={defaultImg} alt="sd" />
                            }
                            </div>
                            <div className="profile-info-container">
                                <Link className="no-text-decor" to={`my-profile/${user._id}`}><Button className="profile-button" color="secondary" variant="outlined" type="submit"><AccountBoxIcon/>Profile</Button></Link>
                                <p className='text-link-name'><PersonIcon />{user.name}</p>
                                <p className='text-link'><WcIcon/>{user.gender}</p>
                                <p className='text-link'><SportsSoccerIcon/>{user.hobbies}</p>
                            </div>
                        </div>
                    )
                })}

            </div>

        )
    }

}


export default FriendList