import React, { Component } from 'react';
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import './AdminSignUp.css';
import { Storefront } from '@material-ui/icons';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerAdminRequest } from "../../../../actions/authActions";
import classnames from "classnames";

class AdminSignUp extends Component {

    state = {
        name: "",
        username: "",
        password: "",
        cpassword: "",
        errors: {}
    };

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            cpassword: this.state.cpassword
        }
        this.props.registerAdminRequest(user, this.props.history);
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
        if (this.props.auth.isAuthenticated) {
            if (this.props.auth.user.email != null) {
                this.props.history.push("/dashboard");
            } else {
                this.props.history.push("/view-items");
            }
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="p-0 bgimage">
                <Container style={{ paddingTop: 20 }} component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className="paper">
                        <div className="avatar">
                            <Avatar >
                                <Storefront />
                            </Avatar>
                        </div>
                        <Typography component="h1" variant="h5">
                            Sign up - Admin
        </Typography>
                        <form className="form" noValidate onSubmit={this.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}  >
                                    <TextField
                                        autoComplete="name"
                                        name="name"
                                        variant="outlined"
                                        fullWidth
                                        id="name"
                                        placeholder="First Name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        className={classnames("", {
                                            invalid: errors.name
                                        })}
                                    />
                                    <span className="error-text">{errors.name}</span>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="username"
                                        placeholder="Username"
                                        name="username"
                                        autoComplete="username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        className={classnames("", {
                                            invalid: errors.username
                                        })}
                                    />
                                    <span className="error-text">{errors.username}</span>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        id="password"
                                        value={this.state.password}
                                        autoComplete="current-password"
                                        onChange={this.handleChange}
                                        className={classnames("", {
                                            invalid: errors.password
                                        })}
                                    />
                                    <span className="error-text">{errors.password}</span>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="cpassword"
                                        placeholder="Confirm Password"
                                        type="password"
                                        id="cpassword"
                                        value={this.state.cpassword}
                                        autoComplete="current-password"
                                        onChange={this.handleChange}
                                        className={classnames("", {
                                            invalid: errors.cpassword
                                        })}
                                    />
                                    <span className="error-text">{errors.cpassword}</span>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                            >
                                Sign Up
          </Button>
                            <Grid container justify="center">
                                <Grid item>
                                    <Link to="signIn-admin" variant="body2">
                                        Already have an account? Sign in
              </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </div>
        );
    }
}

AdminSignUp.propTypes = {
    registerAdminRequest: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerAdminRequest }
)(withRouter(AdminSignUp));