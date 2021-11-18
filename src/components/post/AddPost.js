
import React, { Component } from 'react';
import axios from 'axios';
import './style/postList.css';
import imgService from '../../api/service';
import {Button} from '@mui/material'


class AddPost extends Component {
  state = { 
    title: "", 
    text: "", 
    imageUrl: "" ,
    isUploading: false,
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.isUploading) {
      setTimeout(() => {
        // console.log("callback....");
        // console.log(event);
        this.handleFormSubmit(event);
      }, 500);
    } else{

    const title = this.state.title;
    const text = this.state.text;
    const imageUrl = this.state.imageUrl;

    axios.post(`${process.env.REACT_APP_API_URL}/create-post`, { title, text, imageUrl}, {withCredentials: true})
    .then( () => {
        this.props.getData();
        this.setState({title: "", text: "", imageUrl: "",});
    })
    .catch( error => {
      console.log(error.response.data)
      alert("We had a small error creating your post - please try again.")
    })
  }
}

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
      
    }

  handleFileUpload = e => {
    this.setState({ isUploading: true });
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append('imageUrl', e.target.files[0]);
 
    imgService
      .handleUpload(uploadData)
      .then(response => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imageUrl: response.secure_url, isUploading: false  });
      })
      .catch(err => {
        console.log('Error while uploading the file: ', err)
        alert("We had a small error uploading your file - please try again.")
      });
  };
  


  render(){
    console.log("this.state.imageUrl---->",this.state.imageUrl)
    return(
      <div className="addPost">
        {this.state.isUploading && <p className='error-msg'>Please wait, the image is being uploaded...</p>}
        <form className="addPostFrom" onSubmit={this.handleFormSubmit}>
          <label>
              <input className="title" type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)} placeholder="Title"/>
          </label>
          <label>
              <textarea className="text" name="text" value={this.state.text} onChange={ e => this.handleChange(e)} placeholder="Write your post here"/>
          </label>
          <input type="file" onChange={(e) => this.handleFileUpload(e)}/>
          <Button className="button" color="secondary" variant="contained" type="submit">POST</Button>
        </form>
      </div>
    )
  }
}

export default AddPost;

