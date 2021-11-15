
import React, { Component } from 'react';
import axios from 'axios';

class AddPost extends Component {
  state = { title: "", text: "" }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const text = this.state.text;

    axios.post("http://localhost:3014/api/create-post", { title, text }, {withCredentials: true})
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
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
          <label>Text:</label>
          <textarea name="text" value={this.state.text} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddPost;
