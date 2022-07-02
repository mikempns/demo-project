import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "./layouts/Admin.js";
import { PrivateRoute } from './PrivateRoute';
import Login from './SignupSignin/Signin';
import Logout from './SignupSignin/Logout';
import Register from './SignupSignin/Signup';

class App extends Component{
  render(){
    return(
      <h1>test</h1>
      /*<BrowserRouter>
      <Switch>
        <PrivateRoute path="/admin" component={AdminLayout} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={Register} />
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>*/
    )
  }
}

export default App;
