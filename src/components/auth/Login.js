import React, { Component } from 'react';
import './auth.style/style.css';
import authService from '../../services/auth-services';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Route } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Logophoto from "./auth.style/Social-Gratitude-logo.png"

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = { username: '', password: '', isSubmitted: false};
    }

    handleFormSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;

        this.setState({isSubmitted: true})

        authService
            .login(username, password)
            .then(response => {
                this.setState({ username: '', password: '' });
                this.props.getCurrentUser(response, true);
            })
            .catch(error => {
                console.log(error)
                alert("Please provide a valid username and password.")
            });
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const Input = styled('input')({
            display: 'none',
          });
        return (
            
           <div className="login-page">

            {/* <div class="login-photo">
                        <img src={Logophoto} alt="" />
                    </div>     */}
            
            <div className="login-container-login">
                <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={this.handleFormSubmit}
                >   
                    
                    <h2>Welcome back!</h2>
                    <p>Let's spread gratitude around the world!</p>
                        <TextField
                            required
                            id="outlined-required"
                            name="username"
                            label="Username"
                            defaultValue="username World"
                            value={this.state.username} onChange={this.handleChange}
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

                    <div>
                    <label htmlFor="contained-button-file">
                        <Input id="contained-button-file" type="submit" value="Submit"/>
                        <Button className="button" variant="contained" color="secondary" component="span">
                             Login
                        </Button>
                    </label>
                        {this.state.isSubmitted && <Redirect to="/posts"/>}
                    </div>
                    <p>
                        Don't have account?
                        <Link to={'/register'}> Register</Link>
                    </p>
                </Box>
            </div>
        </div>
        );
    }
}