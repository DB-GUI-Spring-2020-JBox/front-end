import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Login, Register } from './Accounts';
import { Home } from './Home';
import { Article } from './Articles';


export default function Routes({ appProps }) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Home } appProps={ appProps } />	
                <Route path="/login" exact component={ Login } appProps={ appProps } />
                <Route path="/register" exact component={ Register } appProps={ appProps } />
                <Route path="/articles/:articleId" exact component={ Article } appProps={ appProps } />

                {/* ADD CATCH FOR INVALID URLS */}
            </Switch>
        </BrowserRouter>
    );
}