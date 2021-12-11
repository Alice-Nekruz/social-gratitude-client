import React, { Component } from 'react'
import './Footer.css'
import {Button} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <p>Copyright Social-Gratitude, Inc. All rights reserved.</p>
                <a className="no-text-decor" href="#"><Button color="primary" variant="contained"><ArrowUpwardIcon/></Button></a>
            </div>
        )
    }
}
