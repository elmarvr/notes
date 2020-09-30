import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AuthContext from '../context/AuthContext';
import { AuthRoute } from '../models/AuthRoute';
import Container from './func/Container/Container';
import LandingPage from './Landing';
import PasswordResetPage from './PasswordReset';
import PasswordUpdatePage from './PasswordUpdate';
import ProtectedRoute from './ProtectedRoute';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';

const App = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Router>
      <Route path={AuthRoute.AUTH}>
        <Container>
          <ProtectedRoute
            open={!auth.user}
            redirect={AuthRoute.LANDING}
            path={AuthRoute.SIGN_IN}
            component={SignInPage}
          />

          <ProtectedRoute
            open={!auth.user}
            redirect={AuthRoute.LANDING}
            path={AuthRoute.SIGN_UP}
            component={SignUpPage}
          />

          <Route
            path={AuthRoute.PASSWORD_RESET}
            component={PasswordResetPage}
          />

          <Route
            path={AuthRoute.PASSWORD_UPDATE}
            component={PasswordUpdatePage}
          />
        </Container>
      </Route>

      <ProtectedRoute
        open={!!auth.user}
        redirect={AuthRoute.SIGN_IN}
        path={AuthRoute.LANDING}
        component={LandingPage}
      />
    </Router>
  );
};

export default App;
