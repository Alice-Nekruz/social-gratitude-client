
import React, { Component } from 'react';
import './style/postList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import mypic from './style/mypic.png'


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
    return(
      <div className="feed">
          <div className="feed-container">
            
            <div className="side-profile">
              <img src={mypic} alt="profile pic"/>
              <Link to={`/my-profile/${this.props.getUser?._id}`}>Visit My Profile</Link>
              <div className='text-link'>Username: {this.props.getUser?.username}</div>
            </div> 
            
            <div>
              <AddPost getData={() => this.getAllPosts()}/>

              <div >
              { this.state.listOfPosts.reverse().map( posts => {
                  return (
                  <div className="listOfPosts" key={posts._id}>
                      <Link to={`/my-profile/${posts.owner._id}`}>{posts.owner.username}</Link>
                      <h3>{posts.title}</h3>
                      <p>{posts.text}</p>
                      <img src={posts.imageUrl} alt="" />
                  </div>
                  )})
              }
              </div>
            </div>
           
            <div className="friendList">FriendList</div>
          </div>
      </div>
    )
  }
}

export default PostList;
