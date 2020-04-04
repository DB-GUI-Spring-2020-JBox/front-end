import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './accounts.css';


export const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidCred, setInvalidCred] = useState(false);

    function login(event) {
        // Authenticate user

        event.preventDefault();
        event.stopPropagation();

        let accounts = JSON.parse(localStorage.getItem('accounts'));
        let userAccount = accounts.find(x => (x.email === email && x.password === password));

        if (!(email && password) || !userAccount) {
            setInvalidCred(true);
            return;
        }

        props.userHasAuthenticated(true);
    }

    if (props.isAuthenticated) {
        return (<Redirect to="/" push/>);
    }

    return (
    <>
        <form id="account-form" className="container col-sm-9 col-md-7 col-lg-3 mt-5 mx-auto border-0" onSubmit={ e => login(e) }>
            <h1 className="text-center">Sign In</h1>
            { invalidCred && 
                <p className="alert alert-danger">
                    Invalid email or password
                </p> }
            <div className="form-label-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="text"
                    id="email"
                    className="form-control"
                    value={ email }
                    onChange={ e => setEmail(e.target.value) }/>
            </div>
            <div className="form-label-group mt-3">
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    className="form-control"
                    value={ password }
                    onChange={ e => setPassword(e.target.value) }/>
            </div>

            <div id="login-button-container" className="text-center">
                <button 
                    type="submit"
                    className="btn btn-info">
                    Login
                </button>
            </div>

            <div id="register-button-container" className="text-center">
                <span>Need an account? </span>
                <a href="/register">Register here</a>
            </div>
        </form>
    </>
    );
}

export default Login;