import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";   
import SignUp from "./components/auth/SignUp/SignUp";
import { Provider } from "react-redux";
import store from "./store";
import AdminSignIn from "./components/Admin/Auth/SignIn/AdminSignIn";
import SignIn from "./components/auth/SignIn/SignIn";
import AdminSignUp from "./components/Admin/Auth/SignUp/AdminSignUp";

const App = () => {
  return ( 
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />  
          <Route exact path="/signIn" component={SignIn} />  
          <Route exact path="/signUp" component={SignUp} />  
          <Route exact path="/signIn-admin" component={AdminSignIn} />  
          <Route exact path="/signUp-admin" component={AdminSignUp} />  
        </Switch>
      </Router> 
      </Provider>
  );
};
export default App;

