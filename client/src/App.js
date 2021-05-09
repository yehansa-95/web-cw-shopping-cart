import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";   
import SignUp from "./components/auth/SignUp/SignUp";
import { Provider } from "react-redux";
import store from "./store";
import AdminSignIn from "./components/Admin/Auth/SignIn/AdminSignIn";
import SignIn from "./components/auth/SignIn/SignIn";
import AdminSignUp from "./components/Admin/Auth/SignUp/AdminSignUp";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/setAuthToken";
import { saveLocalUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import Items from "./components/Admin/Items/Items";
import CreateItem from "./components/Admin/Items/CreateItem";
import 'react-toastify/dist/ReactToastify.css';
import UpdateItem from "./components/Admin/Items/UpdateItem";
import ViewItem from "./components/Admin/Items/ViewItem";

if (localStorage.jwtToken) { 
  const token = localStorage.jwtToken;
  setAuthToken(token); 
  const decoded = jwt_decode(token); 
  store.dispatch(saveLocalUser(decoded)); 
  const currentTime = Date.now() / 1000;  
  if (decoded.exp < currentTime) { 
    store.dispatch(logoutUser()); 
    window.location.href = "./signIn";
  }
}

const App = () => {
  return ( 
    <Provider store={store}>
      <Router> 
          <Route exact path="/" component={SignIn} />  
          <Route exact path="/signIn" component={SignIn} />  
          <Route exact path="/signUp" component={SignUp} />  
          <Route exact path="/signIn-admin" component={AdminSignIn} />  
          <Route exact path="/signUp-admin" component={AdminSignUp} />   
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/view-items" component={Items} />   
              <PrivateRoute exact path="/add-item" component={CreateItem} />   
              <PrivateRoute exact path="/edit-item/:id" component={UpdateItem} />   
              <PrivateRoute exact path="/view-item/:id" component={ViewItem} />  
            </Switch>
      </Router> 
      </Provider>
  );
};
export default App;

