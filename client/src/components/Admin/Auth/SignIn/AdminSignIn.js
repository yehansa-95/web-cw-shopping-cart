import React, { Component } from 'react'; 
import { Link } from "react-router-dom"; 
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid"; 
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import './AdminSignIn.css'; 
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginAdminRequest } from "../../../../actions/authActions";
import classnames from "classnames";

class AdminSignIn extends Component {
    state = {
        username: '',
        password: ''
        ,
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/view-items"); // push user to dashboard when they login
        }

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

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.loginAdminRequest(user);
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="p-0 bgimage">
                <Container style={{ paddingTop: 20 }} maxWidth="xs">
                    <CssBaseline />
                    <div className="paper">
                        <Typography component="h1" variant="h5">
                            Sign in - Admin
          </Typography>
                        <form className="form" noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="username"
                                placeholder="Username"
                                name="username"
                                autoComplete="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                className={classnames("", {
                                    invalid: errors.username || errors.usernamenotfound
                                })}
                            />
                            <span className="error-text">
                                {errors.username}
                                {errors.usernamenotfound}
                            </span>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                placeholder="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                className={classnames("", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}
                            />
                            <span className="error-text">
                                {errors.password}
                                {errors.passwordincorrect}
                            </span>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                            >
                                Sign In
            </Button>
                            <Button component={Link} to="signIn"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className="submit"
                            >
                                Sign In as User
          </Button>
                            <Grid container
                                spacing={0}
                                direction="column"
                                alignItems="center" style={{ marginTop: '10vh' }} >
                                <Grid item>
                                    <Link color="inherit" to="/signUp-admin" variant="body2">
                                        {"Don't have an account? Sign Up"}
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

AdminSignIn.propTypes = {
    loginAdminRequest: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginAdminRequest }
)(AdminSignIn);