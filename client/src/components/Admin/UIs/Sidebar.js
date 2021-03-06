import React, { Component } from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {faTachometerAlt} from "@fortawesome/free-solid-svg-icons";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {faStore} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logoutUser} from "../../../actions/authActions"; 
import {Link} from "react-router-dom"; 

class Sidebar extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        return (
            <div className="border-right h-100 col-sm-2 col-md-2 sidebar p-1"  id="sidebar-wrapper">
                <div className="list-group list-group-flush">
                    <h5><Link to="/view-items" className="list-group-item list-group-item-dark"><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</Link></h5> 
                    <h5> <Link to="/add-item" className="list-group-item list-group-item-dark"><FontAwesomeIcon icon={faPlus} /> Add Item</Link></h5>
                    <h5> <Link to="/orders" className="list-group-item list-group-item-dark"><FontAwesomeIcon icon={faStore} /> View Orders</Link></h5>
                    <h5><button className="list-group-item list-group-item-danger" onClick={this.onLogoutClick}>Logout {user.name} <FontAwesomeIcon icon={faSignOutAlt} /></button></h5>
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Sidebar);
