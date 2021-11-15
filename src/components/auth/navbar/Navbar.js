import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../../services/auth-services';

export default class Navbar extends Component {
    logoutUser = () => {
        authService.logout().then(() => {
            this.props.getCurrentUser(null, false);
        });
    };

    render() {
        const { isLoggedIn, userData } = this.props;

        if (isLoggedIn) {
            return (
                <nav className="nav-style">
                    <ul>
                        <li>Welcome, {userData.username}</li>
                        <li>
                            <Link to="/">
                                <button onClick={() => this.logoutUser()}>Logout</button>
                            </Link>
                        </li>
                        <li><Link to={'/posts'}> Posts</Link></li>
                    </ul>
                </nav>
            );
        } else {
            return ( null );
        }
    }
}