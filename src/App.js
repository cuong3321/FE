import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from "./Main";
import LoginScreen from "./screens/auth/LoginScreen";
import SignUpScreen from "./screens/auth/SignUpScreen";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginScreen} />
                <Route path="/signup" component={SignUpScreen} />
                <Route path="/" component={Main} />
            </Switch>
        </Router>
    );
};

export default App;
