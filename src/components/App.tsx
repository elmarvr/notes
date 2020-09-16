import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./Navigation";
import SignInPage from "./SignIn";
import SignUpPage from "./SignUp";
import PasswordResetPage from "./PasswordReset";
import PasswordUpdatePage from "./PasswordUpdate";
// import HomePage from "./Home";
// import AccountPage from "./Account";
// import AdminPage from "./Admin";

import * as ROUTES from "../constants/routes";

const App = () => (
  <Router>
    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route path={ROUTES.PASSWORD_RESET} component={PasswordResetPage} />
    <Route path={ROUTES.PASSWORD_UPDATE} component={PasswordUpdatePage} />
  </Router>
);

// <Route exact path={ROUTES.LANDING} component={LandingPage} />
//
// <Route path={ROUTES.HOME} component={HomePage} />
// <Route path={ROUTES.ACCOUNT} component={AccountPage} />
// <Route path={ROUTES.ADMIN} component={AdminPage} />

export default App;
