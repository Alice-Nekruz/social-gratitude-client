import React, { Component } from 'react';
import authService from '../../services/auth-services';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    state = { username: '', password: '' };

    handleFormSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;

        authService
            .login(username, password)
            .then(response => {
                this.setState({ username: '', password: '' });
                //this.props.getUser(response, true);
            })
            .catch(error => console.log(error));
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div>
                <h2>Login:</h2>
                <form onSubmit={this.handleFormSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </label>

                    <label>
                        Password:
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label>

                    <button type="submit"> Login </button>
                </form>

                <p>
                    Don't have account?
                    <Link to={'/register'}> Register</Link>
                </p>
            </div>
        );
    }
}