import React from 'react';
import { Switch } from 'react-router-dom';
import AppliedRoute from './AppliedRoute';
import { Login, Register } from './Accounts';
import { Home } from './Home';
import { Search } from './Search';


export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/Home" exact component={ Home } appProps={ appProps } />
            <AppliedRoute path="/login" exact component={ Login } appProps={ appProps } />
            <AppliedRoute path="/register" exact component={ Register } appProps={ appProps } />
            <AppliedRoute path="/Search" exact component={ Search } appProps={ appProps } />

            {/* ADD CATCH FOR INVALID URLS */}
        </Switch>
    );
}
