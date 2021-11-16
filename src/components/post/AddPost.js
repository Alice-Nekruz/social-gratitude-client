
import React, { Component } from 'react';
import axios from 'axios';
import './style/postList.css';


class AddPost extends Component {
  state = { title: "", text: "" }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const text = this.state.text;

    axios.post(`${process.env.REACT_APP_API_URL}/create-post`, { title, text }, {withCredentials: true})
    .then( () => {
        this.props.getData();
        this.setState({title: "", text: ""});
    })
    .catch( error => console.log(error.response.data) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }


  render(){
    return(
      <div className="addPost">
        <form className="addPostFrom" onSubmit={this.handleFormSubmit}>
          <label>
              <input className="title" type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)} placeholder="Title"/>
          </label>
          <label>
              <textarea name="text" value={this.state.text} onChange={ e => this.handleChange(e)} placeholder="Write your post here"/>
          </label>
          <input type="submit" value="Share" />
        </form>
      </div>
    )
  }
}

export default AddPost;
