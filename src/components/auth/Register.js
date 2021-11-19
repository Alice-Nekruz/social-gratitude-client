import React from 'react';
import { Link } from 'react-router-dom';
import authService from "../../services/auth-services";
import { Redirect } from 'react-router';
import imgService from '../../api/service';
import './auth.style/style.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';



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
            .catch(error => {
                console.log(error)
                alert(`Please make sure this username is not taken. Your password should contain at least 6 characters, one upper case and one symbol (numbers included. Try again - thank you!`)
            })
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
          .catch(err => {
              console.log('Error while uploading the file: ', err)
              alert("We had a little problem uploading your file - try again please.")
            });
      };


    render() {
        const Input = styled('input')({
            display: 'none',
          });

        return (
            <div className="login-page">
            <div className="login-container-register">
                <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={this.handleFormSubmit}
                >

                    <h2>Register</h2>
                        <TextField
                            required
                            id="outlined-required"
                            name="username"
                            label="Required"
                            defaultValue="username World"
                            value={this.state.username} 
                            onChange={this.handleChange}
                        />

                        <TextField
                            required
                            id="outlined-password-input"
                            name="password"
                            label="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            autoComplete="current-password"
                        />

                        <TextField
                            required
                            id="outlined-required"
                            name="name"
                            type="text"
                            label="My name is..."
                            defaultValue="username World"
                            value={this.state.name} 
                            onChange={ e => this.handleChange(e)}
                        />
                        
                            
                            <TextField
                                id="outlined-required"
                                name="name"
                                type="text"
                                label="My hobbies are..."
                                defaultValue="username World"
                                value={this.state.gender} 
                                onChange={ e => this.handleChange(e)}
                            />
                            
                            <TextField
                                id="outlined-required"
                                name="name"
                                type="text"
                                label="My hobbies are..."
                                defaultValue="username World"
                                value={this.state.hobbies} 
                                onChange={ e => this.handleChange(e)}
                            />

                    <div className="register-photo">
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => this.handleFileUpload(e)}/>
                            <Button className="button" variant="outlined" color="secondary" component="span">
                            <PhotoCamera/>Upload
                            </Button>
                        </label>
                        

                        <label htmlFor="contained-button-file">
                            <Input id="contained-button-file" type="submit" value="Submit"/>
                            <Button className="button" variant="outlined" color="secondary" component="span">
                                Register
                            </Button>
                        </label>
                        {this.state.isSubmitted && <Redirect to="/posts"/>}
                    </div>

                <p>
                    Already have an account?
                    <Link to={"/"}> Login</Link>
                </p>
                </Box>
            </div>
            </div>
        )
    }

}

export default Register;