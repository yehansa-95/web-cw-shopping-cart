import React, { Component } from "react";
import Navbar from "../UI/navbar";
import Sidebar from "../UI/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "../../../actions/axios-config";
import './Items.css';
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";


class Items extends Component {

    constructor(props) {
        super(props);
        this.state = {
            records: []
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData()
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {
        axios
            .get("/api/items/")
            .then(res => {
                console.log(res)
                this.setState({ records: res.data })
            })
            .catch()
    }

    editRecord(record) {
        this.setState({ currentRecord: record });
    }

    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="d-flex" id="wrapper">
                    <Sidebar />
                    <div id="mainContent" className="container mt-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(100px, auto)' }}>
                        {this.state.records?.map((value, index) => ( 
                            <div className="card" key={ value._id }>
                                    <img className="card-img-top" src={value.imageData} alt="Card image cap"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{value.name}</h5>
                                        <p className="card-text">{value.description}</p>
                                        <div className="btn-group" role="group"> 
                                        <Link to={`/showItem/${value._id}`} params={{ id:value.id}}>
                                            <button
                                                className="btn btn-primary btn-sm" style={{ marginLeft: '15px' }}
                                            ><FontAwesomeIcon icon={faEye} />
                                            </button>
                                        </Link>
                                            <button
                                            className="btn btn-success btn-sm  float-right" style={{ marginLeft: '15px' }}
                                            // onClick={ }
                                            ><FontAwesomeIcon icon={faShoppingCart} />{" "}Add to Cart
                                            </button>
                                            <label for="exampleInputPassword1">Password</label>

                            
                                        </div>
                                    </div>
                                </div> 
                        ))}
                    </div>
                    <ToastContainer />
                </div>
            </div>
        );
    }

}

Items.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Items);
