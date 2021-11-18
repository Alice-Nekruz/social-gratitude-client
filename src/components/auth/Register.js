import React from 'react';
import { Link } from 'react-router-dom';
import authService from "../../services/auth-services";
import { Redirect } from 'react-router';
import imgService from '../../api/service';


class Register extends React.Component {

    state = {
        username: '',
        password: '',
        name: "",
        gender: "",
        hobbies: "",
        imageUrl: "" ,
        isUploading: false,
        isSubmitted: false, 
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

        const { username, password, name, gender, hobbies,imageUrl  } = this.state;

        this.setState({isSubmitted: true})
        
        authService.register(username, password, name, gender, hobbies, imageUrl)
            .then(createdUser => {
                this.setState({
                    username: "",
                    password: "",
                    name: "",
                    gender: "",
                    hobbies: "",
                    imageUrl: "" 

                });
                this.props.getCurrentUser(createdUser, true);
            })
            .catch(error => console.log(error))
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
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
          .catch(err => console.log('Error while uploading the file: ', err));
      };


    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </label>

                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={ e => this.handleChange(e)}
                        />
                    </label>
                    <label>
                        Gender:
                        <input
                            type="text"
                            name="gender"
                            value={this.state.gender}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Hobbies:
                        <input
                            type="text"
                            name="hobbies"
                            value={this.state.hobbies}
                            onChange={this.handleChange}
                        />
                    </label>
                    
                    <input type="file" onChange={(e) => this.handleFileUpload(e)}/>

                    <button type="submit"> Register </button>
                </form>
                    {this.state.isSubmitted && <Redirect to="/posts"/>}

                <p>
                    Already have an account?
                    <Link to={"/"}> Login</Link>
                </p>
                
            </div>
        )
    }

}

export default Register;