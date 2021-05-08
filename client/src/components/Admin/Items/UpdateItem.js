import React, { Component } from 'react';
import axios from "../../../actions/axios-config";
import { Link, withRouter,useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../UIs/Navbar";
import Sidebar from "../UIs/Sidebar";
import ReactQuill from "react-quill";
import { toast, ToastContainer } from "react-toastify";
import classnames from "classnames";
import { createItemRequest } from "../../../actions/itemActions";
import ImagePlaceholder from '../../../images/ImagePlaceholder.png'
import './Items.css';
import "react-quill/dist/quill.snow.css";

class UpdateItem extends Component {

    state = {
        name: "",
        description: "",
        price: "",
        imageData: ImagePlaceholder,
        errors: {}
    };

    handleSubmit = event => {
        event.preventDefault();
        let item = {};                                                 
        item = new FormData();                                     
        item.append("imageData", event.target.elements.image.files[0]);    
        item.append("name", this.state.name);                       
        item.append("description", this.state.description);            
        item.append("price", this.state.price);                         
        this.createItem(item);           
    };

    createItem(item) { 
        axios
    .post("/api/admin/items/add", item)
        .then(res => this.props.history.push("/view-items"))  
        .catch(err =>{
            this.setState({
                errors: err.response.data
            })
        })
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleImageChange(e) {
        this.setState({
            imageData: URL.createObjectURL(e.target.files[0])
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            console.log(nextProps.errors)
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() { 
        console.log(this.props.match.params.id)
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
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group mt-2">
                                <label className="mt-2 " for="image">Item Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    onChange={e => this.handleImageChange(e)}
                                    className={classnames("", {
                                        invalid: errors.imageData
                                    })}
                                />
                                <img
                                    className="image-preview"
                                    src={this.state.imageData}
                                    alt="Item Preview"
                                />
                                <span className="text-danger">{errors.imageData}</span>
                            </div>
                            <div className="form-group mt-2">
                                <label for="name">Item Name</label>
                                <input type="text" 
                                id="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    className={classnames("form-control", {
                                        invalid: errors.name
                                    })}
                                />
                            </div>
                            <span className="text-danger">{errors.name}</span>
                            <div className="form-group mt-2">
                                <label for="description">Item Description</label>
                                <textarea id="description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    className={classnames("form-control", {
                                        invalid: errors.description
                                    })}
                                    rows="3"
                                />
                                <span className="text-danger">{errors.description}</span>
                            </div>
                            <div className="form-group mt-2">
                                <label for="price">Item Price</label>
                                <input type="price" id="price" value={this.state.price}
                                    onChange={this.handleChange}
                                    className={classnames("form-control", {
                                        invalid: errors.price
                                    })}
                                />
                                <span className="text-danger">{errors.price}</span>
                            </div>
                            <button type="submit" className="btn btn-success mt-2">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

UpdateItem.propTypes = { 
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps
)(UpdateItem);

