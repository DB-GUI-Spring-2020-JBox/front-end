import React from 'react';
import { Redirect } from 'react-router-dom';
import './accounts.css';


export class Login extends React.Component {

    state = {
        email: "",
        password: "",
        invalidCred: false
    }

    login(event) {
        // Authenticate user

        event.preventDefault();
        event.stopPropagation();

        let accounts = JSON.parse(localStorage.getItem('accounts'));
        let userAccount = accounts.find(x => (x.email === this.state.email && x.password === this.state.password));

        if (!(this.state.email && this.state.password) || !userAccount) {
            this.setState({ invalidCred: true });
            return;
        }

        this.setState({
            email: "",
            password: "",
            invalidCred: false
        });

        sessionStorage.setItem("isAuthenticated", "true");
    }

    render() {
        return (
            <>
                {sessionStorage.getItem("isAuthenticated") === "true" &&
                    (<Redirect to="/" push />)}
                <form id="account-form" className="col-sm-9 col-md-7 col-lg-4 mt-5 mx-auto border-0" onSubmit={ e => this.login(e) }>
                    <h1 className="text-center">Sign In</h1>
                    { this.state.invalidCred &&
                        <p className="alert alert-danger">
                            Invalid email or password
                        </p> }
                    <div className="form-label-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="form-control"
                            value={ this.state.email }
                            onChange={ e => this.setState({ email: e.target.value }) }/>
                    </div>
                    <div className="form-label-group mt-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={ this.state.password }
                            onChange={ e => this.setState({ password: e.target.value }) }/>
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
}

export default Login;
