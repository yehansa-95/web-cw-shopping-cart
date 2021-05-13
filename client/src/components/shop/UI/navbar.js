import React, { Component } from "react";
import PropTypes from "prop-types"; 
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";   
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'; 
import './navbar.css';

class Navbar extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() { 
        return (
            <div className="root">
            <AppBar position="static">
              <Toolbar>  
                <Typography variant="h6" className="title">
                  User Dashboard
                </Typography>
                <Button onClick={this.onLogoutClick} color="inherit">Logout</Button>
              </Toolbar>
            </AppBar>
          </div> 
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);
