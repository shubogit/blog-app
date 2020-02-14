import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, useLocation, withRouter } from "react-router-dom";

// components import
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Blog from "./components/Blog";

function App() {
  const location = useLocation();
  console.log(location);
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <PrivateRoute path="/blog" component={Blog} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
