import { motion } from 'framer-motion';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthContext from '../context/AuthContext';
import { AuthRoute } from '../models/AuthRoute';
import { AnimateSwitch, Container, LinkMessage, Navigation, Widget } from './func';
import LandingPage from './Landing';
import PasswordResetPage from './PasswordReset';
import PasswordUpdatePage from './PasswordUpdate';
import ProtectedRoute from './ProtectedRoute';
import SignInPage from './SignIn/SignIn';
import SignUpPage from './SignUp/SignUp';

const App = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <Router>
      <Route path={AuthRoute.AUTH}>
        <Container>
          <Widget>
            <Navigation />
            <AnimateSwitch>
              <Route path={AuthRoute.SIGN_IN} component={SignInPage} />
              <Route path={AuthRoute.SIGN_UP} component={SignUpPage} />
              {/* <Route
                path={AuthRoute.PASSWORD_RESET}
                component={PasswordResetPage}
              /> */}
            </AnimateSwitch>
          </Widget>
          {/* <AnimateSwitch>
            <Route
              path={AuthRoute.SIGN_IN}
              render={() => (
                <LinkMessage to={AuthRoute.PASSWORD_RESET}>
                  Password Reset?
                </LinkMessage>
              )}
            />
          </AnimateSwitch> */}

          <Route
            path={AuthRoute.PASSWORD_UPDATE}
            component={PasswordUpdatePage}
          />
        </Container>
      </Route>

      {/* <ProtectedRoute
        open={!!auth.user}
        redirect={AuthRoute.SIGN_IN}
        path={AuthRoute.LANDING}
        component={LandingPage}
      /> */}
    </Router>
  );
};

export default App;
