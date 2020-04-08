import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Login, Register } from './Accounts';
import { Home } from './Home';
import { Article } from './Articles';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Home } />	
                <Route path="/login" exact component={ Login } />
                <Route path="/register" exact component={ Register } />
                <Route path="/articles/:articleId" exact component={ Article } />

                {/* ADD CATCH FOR INVALID URLS */}
            </Switch>
        </BrowserRouter>
    );
}