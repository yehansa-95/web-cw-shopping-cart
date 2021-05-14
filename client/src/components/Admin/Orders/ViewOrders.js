import React, { Component, Fragment } from "react";
import Navbar from "../UIs/Navbar";
import Sidebar from "../UIs/Sidebar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "../../../actions/axios-config";
import './ViewOrders.css';
import { toast, ToastContainer } from "react-toastify";
import ReactDatatable from '@ashvin27/react-datatable';

class ViewOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            records: []
        };
        this.getData = this.getData.bind(this);

        this.columns = [
            {
                key: "_id",
                text: "Id",
                className: "id",
                align: "left",
                sortable: true,
            },
            {
                key: "name",
                text: "Name",
                className: "name",
                align: "left",
                sortable: true,
            },
            {
                key: "bill",
                text: "Price(Rs)",
                className: "price",
                align: "left",
                sortable: true
            },
            {
                key: "date_added",
                text: "Date",
                className: "date",
                align: "left",
                sortable: true
            },
        ]
    }


    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }

    componentDidMount() {
        this.getData()
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {
        axios
            .get("/api/admin/orders/all")
            .then(res => {
                console.log(res)
                this.setState({ records: res.data })
            })
            .catch()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="d-flex m-1" id="wrapper">
                    <Sidebar />
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <ReactDatatable
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        );
    }

}

ViewOrders.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(ViewOrders);
