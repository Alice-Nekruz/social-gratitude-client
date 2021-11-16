import React, { Component } from 'react';
import './style/navbar.css';
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
                        <div className="logo"><Link to={'/posts'}> GRATITUDE</Link></div>
                        <div>Welcome, {userData.username}</div>
                        <div>
                            <Link to="/">
                                <button onClick={() => this.logoutUser()}>Logout</button>
                            </Link>
                        </div>
                </nav>
            );
        } else {
            return ( null );
        }
    }
}