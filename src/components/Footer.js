import React, { Component } from 'react'
import authService from '../services/auth-services';
import './Footer.css'
import {Button} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default class Footer extends Component {
    logoutUser = () => {
        authService.logout().then(() => {
            this.props.getCurrentUser(null, false);
        });
    };

    render() {

        const { isLoggedIn } = this.props;

        if (isLoggedIn) {    
        return (
            <div className="footer">
                <p>Copyright Social-Gratitude, Inc. All rights reserved.</p>
                <a className="no-text-decor" href="#"><Button color="secondary" variant="contained"><ArrowUpwardIcon/></Button></a>
            </div>
        )
        } else {
            return ( null );
        }
    }
}
