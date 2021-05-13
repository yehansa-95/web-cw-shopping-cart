import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { Link } from "react-router-dom";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons/faUserAlt";
import Navbar from "../UIs/Navbar";
import Sidebar from "../UIs/Sidebar";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { googleOAuth2 } from '../../../actions/googleActions';

class Dashboard extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        return (
            <div>
                <div className="d-flex" id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <h1 className="mt-2 text-primary">User Logged</h1>
                            <li className="nav-item active">
                                {this.props.googleauth.isAuthenticated ? <GoogleLogout
                                    clientId="1013217801761-07r1hv0d02r63r9cnmoju6sdafrvg9ra.apps.googleusercontent.com"
                                    buttonText="Logout"
                                    onLogoutSuccess={this.props.googleOAuth2}
                                /> : <a className="nav-link " href="#" onClick={this.onLogoutClick}>Logout ({user.name}) <FontAwesomeIcon icon={faSignOutAlt} /> </a>}
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    googleauth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    googleauth: state.googleauth,
});

export default connect(
    mapStateToProps,
    { logoutUser, googleOAuth2 }
)(Dashboard);
