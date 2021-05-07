import React, { Component } from 'react';
import axios from "axios";
import { Link, withRouter } from "react-router-dom"; 
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUserRequest } from "../../../actions/authActions";
import classnames from "classnames";
import Navbar from "../UIs/Navbar";
import Sidebar from "../UIs/Sidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class CreateItem extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        cpassword: "",
        errors: {}
    };

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            cpassword: this.state.cpassword
        }
        this.props.registerUserRequest(user, this.props.history);
    };

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        // if (this.props.auth.isAuthenticated && this.props.auth.user.email != null) {
        //     this.props.history.push("/dashboard");
        // }
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
            <Navbar />
            <div className="d-flex" id="wrapper">
                <Sidebar />
            <div className="container mt-2">
            <h1 className="mt-2 text-success">Add Item</h1>
             <form>
            <div className="form-group mt-2">
              <label for="name">Item Name</label>
              <input type="text" className="form-control" id="name"/> 
            </div> 
            <div className="form-group mt-2">
              <label for="description">Item Description</label>
              <ReactQuill id="description"
                  />
            </div> 
            <div className="form-group mt-2">
              <label for="price">Item Price</label>
              <input type="price" className="form-control" id="price"/> 
            </div> 
            <button type="submit" className="btn btn-success mt-2">Submit</button>
          </form>
          </div>
          </div>
          </div>
        );
    }
}

CreateItem.propTypes = {
    registerUserRequest: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUserRequest }
)(withRouter(CreateItem));