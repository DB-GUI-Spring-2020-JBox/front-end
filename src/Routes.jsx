import React from 'react';
import { Switch } from 'react-router-dom';
import AppliedRoute from './AppliedRoute';
import { Login } from './Accounts';
import { Home } from './Home';


export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={ Home } appProps={ appProps } />	
            <AppliedRoute path="/login" exact component={ Login } appProps={ appProps } />

            {/* ADD CATCH FOR INVALID URLS */}
        </Switch>
    );
}