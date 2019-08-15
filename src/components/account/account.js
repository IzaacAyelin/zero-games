import React, { Component } from 'react';
import './account.css';
import { Route } from "react-router-dom";
import Login from './login';
import Signup from './signup';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        
        return (
            <div className="account">
                <div className="login-layover">
                        <Route path="/account/login" exact component={Login} />
                        <Route path="/account/signup/" component={Signup} />
                </div>
            </div>
        );
    }
}

export default Account;