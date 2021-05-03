import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";  
import SignIn from "./components/auth/signIn/SignIn";
import SignUp from "./components/auth/SignUp/SignUp";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return ( 
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />  
          <Route exact path="/signIn" component={SignIn} />  
          <Route exact path="/signUp" component={SignUp} />  
        </Switch>
      </Router> 
      </Provider>
  );
};
export default App;

