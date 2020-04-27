import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Login, Register } from "./Accounts";
import { Home } from "./Home";
import { Search } from "./Search";
import { Article } from "./Articles";
import { Browse } from "./Browse";
import { Messenger, UpdateProfile, UserProfile } from "./Profiles";
import { PostArticle } from "./Articles";

export default function Routes({ appProps }) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} appProps={appProps} />
        <Route path="/login" exact component={Login} appProps={appProps} />
        <Route
          path="/register"
          exact
          component={Register}
          appProps={appProps}
        />
        <Route path="/search" exact component={Search} appProps={appProps} />
        <Route path="/articles/:articleId" exact component={Article} />
        <Route path="/browse" exact component={Browse} />
        <Route
          exact
          path="/messenger"
          render={(props) => (
            <Messenger {...props} dimensions={appProps.dimensions} />
          )}
        />
        <Route
          path="/messenger/t/:recipientId"
          render={(props) => (
            <Messenger {...props} dimensions={appProps.dimensions} />
          )}
        />

        <Route path="/profile" exact component={UserProfile} />
        <Route path="/profile/update" exact component={UpdateProfile} />
        <Route path="/postarticle" exact component={PostArticle} />
        <Route path="/articles/:articleId/edit" exact component={PostArticle} />
        <Route path="/userprofile/:userId" exact component={UserProfile} />
        {/* ADD CATCH FOR INVALID URLS */}
      </Switch>
    </BrowserRouter>
  );
}
