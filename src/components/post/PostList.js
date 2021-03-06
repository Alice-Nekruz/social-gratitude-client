
import React, { Component } from 'react';
import './style/postList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import mypic from './style/mypic.png'
import {Button} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';
import WcIcon from '@mui/icons-material/Wc';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import defaultImg from '../../img/default-image-profile.png'
import backgroundPhoto from '../../photos/Background_photo.png'


import AddPost from './AddPost'; // <== !!!

class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listOfPosts: [],
      ownerID: ''
      // userId: this.props
    }
  }

  getPostOwner = (id) =>{
    axios.get(`${process.env.REACT_APP_API_URL}/my-profile/(id)`, {withCredentials: true})
    .then(userFromApi => {
      this.setState({
        ownerID: userFromApi.data
      })
    })
  }
  
  getAllPosts = () =>{
    axios.get(`${process.env.REACT_APP_API_URL}/posts`, {withCredentials: true})
    .then(responseFromApi => {
      this.setState({
        listOfPosts: responseFromApi.data
      })
    })
  }

  componentDidMount() {
    this.getAllPosts();
    this.getPostOwner()
  }


  render(){
    console.log("imageurl.....", this.props.getUser?.imageUrl )
    return(
      <div className="feed responsive-div-postlist">
          <div className="feed-container">
          
          <div className="profile-friendlist">
              <div className="side-profile">
                  <div className="side-profile-photo">
                      <img className="side-background" src={backgroundPhoto} alt="" />
                      {this.props.getUser?.imageUrl ?
                        <img src={this.props.getUser?.imageUrl} className="main-profile-pic-post" alt="sd"/> :
                        <img src={defaultImg} alt="sd" />
                      }
                  </div>
                  <Link className="no-text-decor" to={`/my-profile/${this.props.getUser?._id}`}><Button className="profile-button" color="secondary" variant="outlined" type="submit"><AccountBoxIcon/>Profile</Button></Link>
                  <div className="profile-info-container">
                    <div className='text-link-name'> <PersonIcon />{this.props.getUser?.name}</div>
                    <div className='text-link'><WcIcon/>{this.props.getUser?.gender}</div>
                    <div className='text-link'><SportsSoccerIcon/>{this.props.getUser?.hobbies}</div>
                  </div>
              </div> 

            
            <div className="profile-mobile">
                <div className="side-profile-photo-mobile">
                    <img className="side-background-m" src={backgroundPhoto} alt="" />
                    <Link className="no-text-decor" to={`/my-profile/${this.props.getUser?._id}`}>
                        {this.props.getUser?.imageUrl ?
                          <img src={this.props.getUser?.imageUrl} className="main-profile-pic-mobile" alt="sd"/> :
                          <img src={defaultImg} alt="sd" />
                        }
                    </Link>
                    <Link className="no-text-decor" to={`/my-profile/${this.props.getUser?._id}`}>
                        <div className='text-link-name-mobile'> <PersonIcon />{this.props.getUser?.name}</div>
                    </Link>    
                </div>

            </div>

            <Link className="no-text-decor" to="/friends"> 
                      <div className="friendList-side"> 
                          <Button variant="contained"> Search Friends </Button>
                      </div>
              </Link>
              </div>
            
            <div>
              <AddPost getData={() => this.getAllPosts()}/>

              <div className="post-container">
                { this.state.listOfPosts.reverse().map( posts => {
                    return (
                    <div className="listOfPosts" key={posts._id}>
                        <div className="postoflist-info">
                            <div className="postlist-profileimg-name">
                            <Link className="text-link-name" to={`/my-profile/${posts.owner._id}`}>
                              <div className='profile-img'>
                                {this.props.getUser?.imageUrl ?
                                <img src={posts.owner.imageUrl} alt="photo" />
                                  : <img src={defaultImg} alt="photo-avatar" />
                              }
                              </div>
                            </Link>
                              <Link className="text-link-name" to={`/my-profile/${posts.owner._id}`}>{posts.owner.name}</Link>
                            </div>
                            <div className="post-title-text">
                              {/* <h4>{posts.title}...</h4> */}
                              <p> {posts.text}</p>
                            </div>  
                        </div>  
                        <img src={posts.imageUrl} alt="" />
                    </div>
                  )})
                }
              </div>
            </div>
           
                <Link className="no-text-decor" to="/friends"> 
                    <div className="friendList"> 
                        <Button variant="contained"> Search Friends </Button>
                    </div>
                </Link>
          </div>
      </div>
    )
  }
}

export default PostList;
