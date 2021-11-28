import React, { Component } from 'react';
import './style/navbar.css';
import { Link } from 'react-router-dom';
import authService from '../../../services/auth-services';
import logoPic from './style/website.png'

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
                <nav className="nav-style responsive-div-navbar">
                        <div className="logo"><Link className="logo-text" to={'/posts'}><img src={logoPic} alt="logo pic"/>
</Link></div>
                        <div className="welcome">Let's spread gratitude into the world!</div>
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