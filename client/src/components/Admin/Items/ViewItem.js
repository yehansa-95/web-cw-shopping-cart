import React, { Component } from 'react';
import axios from "../../../actions/axios-config";
import { Link, withRouter, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../UIs/Navbar";
import Sidebar from "../UIs/Sidebar";
import ReactQuill from "react-quill";
import classnames from "classnames";
import { createItemRequest } from "../../../actions/itemActions";
import ImagePlaceholder from '../../../images/ImagePlaceholder.png'
import { toast, ToastContainer } from "react-toastify";
import './Items.css';
import "react-quill/dist/quill.snow.css";

class ViewItem extends Component {

    state = {
        name: "",
        description: "",
        price: "",
        imageData: ImagePlaceholder,
        errors: {}
    };

    getData() {
        const params = new URLSearchParams([['id', this.props.match.params.id]]);
        axios
            .get("/api/admin/items/getById", { params })
            .then(res => {
                console.log(res)
                let resData = res.data
                this.setState({
                    name: resData.name,
                    description: resData.description,
                    price: resData.price,
                    imageData: `${res.config.baseURL}/${resData.imageData}`
                })
            })
            .catch()
    } 

    componentDidMount() {
        this.getData()
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <Navbar />
                <div className="d-flex" id="wrapper">
                    <Sidebar />
                    <div className="container mt-2">
                        <h1 className="mt-2 text-success">{this.state.name}</h1>  
                                <img 
                                className="justify-content-md-center"
                                    style={{width:500,height:500,alignSelf: 'center'}}
                                    src={this.state.imageData}
                                    alt="Item Preview"
                                />  
                            <div className="form-group mt-2">
                                <label for="name">Item Name</label>
                                <input disabled type="text"
                                    id="name"
                                    value={this.state.name} 
                                    className="form-control" 
                                />
                            </div> 
                            <div className="form-group mt-2">
                                <label for="description">Item Description</label>
                                <textarea disabled id="description"
                                    value={this.state.description} 
                                    className="form-control" 
                                    rows="3"
                                /> 
                            </div>
                            <div style={{marginBottom:100}} className="form-group mt-2">
                                <label for="price">Item Price</label>
                                <input disabled type="price" id="price" value={this.state.price} 
                                    className="form-control"
                                /> 
                            </div> 
                        <ToastContainer />
                    </div>
                </div>
            </div>
        );
    }
}

ViewItem.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps
)(ViewItem);

