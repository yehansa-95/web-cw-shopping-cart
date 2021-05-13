import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const PrivateRoute = ({ component: Component, auth,googleauth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true || googleauth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signIn" />
      )
    }
  />
);
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  googleauth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  googleauth:state.googleauth
});
export default connect(mapStateToProps)(PrivateRoute);