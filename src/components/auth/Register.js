import React from 'react';
import { Link } from 'react-router-dom';
import authService from "../../services/auth-services";
import { Redirect } from 'react-router';

class Register extends React.Component {

    state = {
        username: '',
        password: '',
        isSubmitted: false
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.state;

        this.setState({isSubmitted: true})
        
        authService.register(username, password)
            .then(createdUser => {
                this.setState({
                    username: "",
                    password: "",
                });
                this.props.getCurrentUser(createdUser, true);
            })
            .catch(error => console.log(error))
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


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