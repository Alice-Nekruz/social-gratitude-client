import React, { Component } from 'react';
import './style/navbar.css';
import { Link } from 'react-router-dom';
import authService from '../../../services/auth-services';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

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
                        <div className="logo"><Link className="logo-text" to={'/posts'}> GRATITUDE</Link></div>
                        <div className="welcome">Welcome, {userData.username}</div>
                        <div >
                            <Link className="logout-button" to="/">
                                <Button onClick={() => this.logoutUser()} variant="contained" color="secondary">Logout</Button>
                            </Link>
                            
                        </div>
                </nav>
            );
        } else {
            return ( null );
        }
    }
}