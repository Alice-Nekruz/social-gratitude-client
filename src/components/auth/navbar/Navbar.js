import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../../services/auth-services';

export default class Navbar extends Component {
    logoutUser = () => {
        authService.logout().then(() => {
            this.props.getUser(null, false);
        });
    };

    render() {
        const { userIsLoggedIn, userData } = this.props;

        if (userIsLoggedIn) {
            return (
                <nav className="nav-style">
                    <ul>
                        {userIsLoggedIn && <li>Welcome, {userData.username}</li>}
                        {/* <li>
                            <Link to="/projects" style={{ textDecoration: 'none' }}>
                                Projects
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/">
                                <button onClick={() => this.logoutUser()}>Logout</button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            );
        } else {
            return ( null );
        }
    }
}