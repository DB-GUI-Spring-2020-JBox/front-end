import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './login.css';


export const Login = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function login(event) {
        // Authenticate user

        if (username && password) {
            props.userHasAuthenticated(true);
        }

        event.preventDefault();
        event.stopPropagation();
    }

    if (props.isAuthenticated) {
        return (<Redirect to="/" push/>);
    }

    return (
    <>
        <form id="login-form" className="container col-sm-9 col-md-7 col-lg-3 mt-5 mx-auto border-0" onSubmit={ e => login(e) }>
            <h1 className="text-center">Sign In</h1>
            <div className="form-label-group">
                <label htmlFor="username">Username</label>
                <input 
                    type="text"
                    id="username"
                    className="form-control"
                    value={ username.username }
                    onChange={ e => setUsername({ username: e.target.value }) }/>
            </div>
            <div className="form-label-group mt-3">
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    className="form-control"
                    value={ password.password }
                    onChange={ e => setPassword({ password: e.target.value }) }/>
            </div>
            <div className="form-label-group w-100 text-center mt-4">
                <button 
                    type="submit"
                    className="btn btn-info">
                    Login
                </button>
            </div>
        </form>
    </>
    );
}

export default Login;