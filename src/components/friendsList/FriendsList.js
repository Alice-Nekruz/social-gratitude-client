import React from 'react';
import axios from 'axios';
import SearchBar from "./SearchBar";
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
        friendList: [],
        searchInputState: "",
    }

    setSearchField = (searchInput) => {
        this.setState({ searchInputState: searchInput });
      };

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
        this.manOnly()
    }

    manOnly = () => {
        this.setState((prevState)=>{
            const manList = prevState.friendList.filter((man)=>{
                return man.gender === "male" || man.gender === "Male";
            });
            return {friendList: manList}
        })
      }

    girlOnly = () => {
        this.setState((prevState)=>{
            const girlList = prevState.friendList.filter((girl)=>{
                return girl.gender === "female" || girl.gender === "Female";
            });
            return {friendList: girlList}
        })
      }
    
    

    render(){
        let filteredUsers = this.state.friendList.filter((user) => {
            return user.name
              .toLowerCase()
              .includes(this.state.searchInputState.toLowerCase());
          });
        return(
            <div className="mainContainer">

                    <SearchBar
                        listOfSeniors={filteredUsers}
                        setSearchField={this.setSearchField}
                    />
                    <Button className="profile-button" color="secondary" variant="outlined" onClick={()=>this.manOnly()}><AccountBoxIcon/>Male</Button>
                    <Button className="profile-button" color="primary" variant="outlined" onClick={()=>this.girlOnly()}><AccountBoxIcon/>Female</Button>
                    <Button className="profile-button" color="primary" variant="contained" onClick={()=>this.getFriendList()}><AccountBoxIcon/>Reset</Button>
                <div className="friend-list">
                    {filteredUsers.map(user => {
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
            </div>

        )
    }

}


export default FriendList