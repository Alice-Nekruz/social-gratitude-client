
import React, { Component } from 'react';
import './style/postList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    return(
      <div className="feed">
            <h1>Gratitude feed</h1>
            <div>
                <AddPost getData={() => this.getAllPosts()}/>
            </div>


            <div className="listOfPosts">
            { this.state.listOfPosts.map( posts => {
                return (
                <div key={posts._id}>
                    <h3>{posts.title}</h3>
                    <p>{posts.text}</p>
                </div>
                )})
            }
            </div>
           
            <div><Link to={`/my-profile/${this.props.getUser?._id}`}>My Profile</Link></div> 
      </div>
    )
  }
}

export default PostList;
