import React, { Component } from 'react';
import axios from "../../../actions/axios-config";
import { Link, withRouter, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../UI/navbar";
import Sidebar from "../UI/sidebar";
import ReactQuill from "react-quill";
import classnames from "classnames";
import { createItemRequest } from "../../../actions/itemActions";
import ImagePlaceholder from '../../../images/ImagePlaceholder.png'
import { toast, ToastContainer } from "react-toastify";
import './Items.css';
import "react-quill/dist/quill.snow.css";
// import { put } from '../../../../../server/routes/api/oder';

class cart extends Component {

    state = {
        name: "",
        description: "",
        price: "",
        imageData: ImagePlaceholder,
        errors: {}
    };

    constructor(props) {
        super(props);
        this.state = {
            records: []
        };
        this.getData = this.getData.bind(this);
        console.log(this);
    }

    handleSubmit = event => {
        event.preventDefault();
        let item = {};
        item = new FormData();
        item.append("imageData", event.target.elements.image.files[0]);
        item.append("name", this.state.name);
        item.append("description", this.state.description);
        item.append("price", this.state.price);
        item.append("id", this.props.match.params.id);
        this.updateItem(item); 
    };

    getData() {
        axios
            .get("/api/order/cart")
            .then(res => {
                console.log(res)
                this.setState({ records: res.data })
            })
            .catch()
            .catch()
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
        this.getData()
    }

    update = async (id, qty) => {
        
        await axios.request({
            method: 'PUT',
            url: (`/api/order/cartedit/${id}`),
            data: {
                qty: qty
            }
        })
  };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <Navbar />
                <div className="d-flex" id="wrapper">
                    <Sidebar />
                    {this.state.records?.map((value, index) => (
                        <div class="card w-75">
                            <div class="card-body">
                                <h5 class="card-title">{value.name} {value._id}</h5>
                                <p class="card-text">Quntity : {value.qty}</p>
                                <from onsubmit={this.update}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="QTY"
                                        value={value.qty}
                                        onChange={(qty) => this.setState({ qty: qty.target.value })}
                                    />
                                    <Link>
                                        <button className="btn btn-primary"
                                            tyle={{ marginLeft: '15px' }}
                                        onClick = {() => this.update(value._id , this.state.qty)}> Update </button>
                                </Link>
                                </from>
                            </div>
                        </div>
                    ))}
                    

                </div>
            </div>
        );
    }
}

cart.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps
)(cart);

