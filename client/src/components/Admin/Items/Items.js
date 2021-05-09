import React, { Component, Fragment } from "react";
import Navbar from "../UIs/Navbar";
import Sidebar from "../UIs/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "../../../actions/axios-config";
import './Items.css';
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

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
            .get("/api/admin/items/all")
            .then(res => {
                console.log(res)
                this.setState({ records: res.data })
            })
            .catch()
    }

    editRecord(record) {
        this.setState({ currentRecord: record });
    }

    deleteRecord(record) {
        axios
            .delete("/api/admin/items/delete", { data: { _id: record._id } }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    toast.error(res.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    })
                }
            })
            .catch();
        this.getData();
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
                                <div className="card">
                                    <img className="card-img-top" src={value.imageData} alt="Card image cap"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{value.name}</h5>
                                        <p className="card-text">{value.description}</p>
                                        <div class="btn-group" role="group"> 
                                        <button
                                            className="btn btn-danger btn-sm  "
                                            onClick={() => this.deleteRecord(value)}><FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        <Link to={`/edit-item/${value._id}`}>
                                            <button
                                                className="btn btn-secondary btn-sm" style={{ marginLeft: '10px' }}
                                            ><FontAwesomeIcon icon={faEdit} />
                                            </button>
                                        </Link>
                                        <Link to={`/view-item/${value._id}`}>
                                            <button
                                                className="btn btn-primary btn-sm" style={{ marginLeft: '10px' }}
                                            ><FontAwesomeIcon icon={faEye} />
                                            </button>
                                        </Link>
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
