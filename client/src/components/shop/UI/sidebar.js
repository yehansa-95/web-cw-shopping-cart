import React, { Component } from "react";
import PropTypes from "prop-types"; 
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { Link } from "react-router-dom"; 
import Divider from '@material-ui/core/Divider'; 
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'; 
import { makeStyles} from '@material-ui/core/styles';
import './sidebar.css'; 
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Storefront } from '@material-ui/icons';
import { googleOAuth2 } from '../../../actions/googleActions';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const drawerWidth = 500;

const classes = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    appBar: {
        width: drawerWidth,
        marginLeft: drawerWidth
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3
    }
}));

class Sidebar extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        console.log(window)
        const { user } = this.props.auth;
        const drawer = (
            <div className={classes.toolbar}>
                <Divider />
                <List>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItem button key="Items">
                            <ListItemIcon><InboxIcon /> </ListItemIcon>
                            <ListItemText primary="Items" />
                        </ListItem>
                    </Link>
                    <Link to="/cart" style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItem button key="Items">
                            <ListItemIcon><Storefront /> </ListItemIcon>
                            <ListItemText primary="Cart" />
                        </ListItem>
                    </Link> 
                    {this.props.googleauth.isAuthenticated ? <GoogleLogout
                                    clientId="1013217801761-07r1hv0d02r63r9cnmoju6sdafrvg9ra.apps.googleusercontent.com"
                                    buttonText="Logout"
                                    onLogoutSuccess={this.props.googleOAuth2} /> :
                        <ListItem button onClick={this.onLogoutClick} key="Items">
                            <ListItemIcon><ExitToAppIcon color="secondary"/> </ListItemIcon>
                            <ListItemText primary="Exit" color="secondary"/>
                        </ListItem> }
                </List>
            </div>

        );
        return (
            drawer 
        );
    }
}

Sidebar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    googleauth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    googleauth: state.googleauth,
});

export default connect(
    mapStateToProps,
    { logoutUser,googleOAuth2 }
)(Sidebar);
