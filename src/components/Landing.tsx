import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import AuthContext from '../context/AuthContext';
import { AuthRoute } from '../models';

const Landing = () => {
  const history = useHistory();

  const { auth, signOut } = useContext(AuthContext);

  const onClick = async () => {
    await signOut();
    history.push(AuthRoute.SIGN_IN);
  };

  return (
    <>
      <h1> Welcome {auth.user?.email}</h1>
      <Button size="large" color="blue" onClick={onClick}>
        Sign Out
      </Button>
    </>
  );
};

export default Landing;
