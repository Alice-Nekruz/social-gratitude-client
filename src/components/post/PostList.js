
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddPost from './AddPost'; // <== !!!

class PostList extends Component {
  state = { listOfPosts: [] }

  getAllPosts = () =>{
    axios.get(`http://localhost:3014/api/posts`)
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
    return(
      <div>
        <h1>hello</h1>
        
        <div style={{width: '60%', float:"left"}}>
          { this.state.listOfPosts.map( posts => {
            return (
              <div key={posts._id}>
                  <h3>{posts.title}</h3>
                  <p>{posts.text}</p>
              </div>
            )})
          }
        </div>
        <div style={{width: '40%', float:"right"}}>
            <AddPost getData={() => this.getAllPosts()}/>
        </div>
        <div><Link to={'/my-profile/:id'}>My Profile</Link></div>
      </div>
    )
  }
}

export default PostList;
