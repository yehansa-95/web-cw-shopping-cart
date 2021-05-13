import React, { Component } from 'react'; 
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField"; 
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import './SignIn.css';
import { Storefront } from '@material-ui/icons';
import PropTypes from "prop-types";
import { connect } from "react-redux"; 
import { loginUserRequest } from "../../../actions/authActions";  
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { googleOAuth2 } from '../../../actions/googleActions';
import { bindActionCreators } from 'redux';

class SignIn extends Component {
    state = {
        email: '',
        password: ''
        ,
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.auth.isAuthenticated || nextProps.googleauth.isAuthenticated) {
            this.props.history.push("/dashboard"); 
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated || this.props.googleauth.isAuthenticated) { 
            if (this.props.auth.user.email != null){
                this.props.history.push("/dashboard");
            }else{
                this.props.history.push("/view-items");
            }
        }
      }

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUserRequest(user);
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        const { errors } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paper">
                    <div className="avatar">
                        <Avatar >
                            <Storefront />
                        </Avatar>
                    </div>
                    <Typography component="h1" variant="h5">
                        Sign in - User
          </Typography>
                    <form className="form" noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            placeholder="Email"
                            name="email"
                            autoComplete="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className={classnames("", {
                                invalid: errors.email || errors.emailnotfound
                            })}
                        />
                        <span className="error-text">
                            {errors.email}
                            {errors.emailnotfound}
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

            <div className="avatar">
            <GoogleLogin 
                clientId="1013217801761-07r1hv0d02r63r9cnmoju6sdafrvg9ra.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={this.props.googleOAuth2}
                onFailure={this.props.googleOAuth2}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                fullWidth
              /> 
               </div>
            <Button component={Link} to="/signIn-admin" 
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className="submit"
                        >
                            Sign In as Admin
          </Button>
                        <Grid container
                            spacing={0}
                            direction="column"
                            alignItems="center" style={{ marginTop: '10vh' }} >
                            <Grid item>
                                <Link color="inherit" to="/signUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

SignIn.propTypes = {
    loginUserRequest: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    googleauth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    googleauth: state.googleauth,
    errors: state.errors
});
 
export default connect(
    mapStateToProps,
    { loginUserRequest,googleOAuth2 }
)(SignIn);