import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Account } from '../models';
import './accounts.css';


export const Register = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validFirstName, setValidFirstName] = useState(true);
    const [validLastName, setValidLastName] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [complete, setComplete] = useState(false);

    function register(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!(firstName && lastName && email && password)) {
            return;
        }

        let account = new Account(
            firstName, 
            lastName, 
            email,
            password);

        if (!localStorage.getItem('accounts')) {
            localStorage.setItem('accounts', JSON.stringify([]));
        }

        let accounts = JSON.parse(localStorage.getItem('accounts'));
        accounts.push(account);
        localStorage.setItem('accounts', JSON.stringify(accounts));

        setComplete(true);
    }

    function validateEmail() {
        let emailPattern = /[\w]+@[\w]+\.[\w]{2,}/;
        if (emailPattern.test(email))
            return true;
        else 
            return false;
    }

    if (complete) {
        return (<Redirect to="/login" push/>)
    }

    return (
    <>
        { sessionStorage.getItem("isAuthenticated") === "true" &&
            (<Redirect to="/" push/>) }
        <form id="account-form" className="container col-sm-9 col-md-7 col-lg-3 mt-5 mx-auto border-0" onSubmit={ e => register(e) }>
            <h1 id="account-header" className="text-center">Create an Account</h1>
            <div className={`form-label-group required`}>
                <label htmlFor="username">First name</label>
                <input 
                    type="text"
                    id="username"
                    className={`form-control ${!validFirstName && "is-invalid"}`}
                    value={ firstName }
                    onChange={ e => setFirstName(e.target.value) }
                    onBlur={ () => {
                        if (firstName)
                            setValidFirstName(true);
                        else
                            setValidFirstName(false);
                    } }/>
            </div>
            <div className="form-label-group required">
                <label htmlFor="lastName">Last name</label>
                <input 
                    type="text"
                    id="lastName"
                    className={`form-control ${!validLastName && "is-invalid"}`}
                    onChange={ e => setLastName(e.target.value) }
                    onBlur={ () => {
                        if (lastName)
                            setValidLastName(true);
                        else
                            setValidLastName(false);
                    } }/>
            </div>
            <div className="form-label-group required">
                <label htmlFor="email">Email</label>
                <input 
                    type="text"
                    id="email"
                    className={`form-control ${!validEmail && "is-invalid"}`}
                    value={ email }
                    onChange={ e => {
                        setEmail(e.target.value);
                        if (!validateEmail())
                            setValidEmail(false);
                        else
                            setValidEmail(true);
                    } } 
                    onBlur={ () => {
                        if (validateEmail())
                            setValidEmail(true);
                        else
                            setValidEmail(false);
                    } }/>
            </div>

            <div className="form-label-group required">
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    className={`form-control ${!validPassword && "is-invalid"}`}
                    value={ password }
                    onChange={ e => setPassword(e.target.value) }
                    onBlur={ () => {
                        if (password)
                            setValidPassword(true);
                        else
                            setValidPassword(false);
                    } }/>
            </div>

            <div id="login-button-container" className="text-center">
                <button 
                    type="submit"
                    className="btn btn-info">
                    Submit
                </button>
            </div>
        </form>
    </>
    );
}

export default Register;