
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
      // userId: this.props
    }
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
  }


  render(){
    console.log(this.props.getUser)
    return(
      <div className="feed">
          <div className="feed-container">
            
            <div className="side-profile">
              <img src={mypic} alt="profile pic"/>
              <Link className='text-link' to={`/my-profile/${this.props.getUser?._id}`}>Username: {this.props.getUser?.username}</Link>
            </div> 
            
            <div>
              <AddPost getData={() => this.getAllPosts()}/>

              <div >
              { this.state.listOfPosts.map( posts => {
                  return (
                  <div className="listOfPosts" key={posts._id}>
                      <Link to={`/my-profile/${posts._id}`}>Bob Charly</Link>
                      <h3>{posts.title}</h3>
                      <p>{posts.text}</p>
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
