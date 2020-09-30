import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { AuthRoute } from '../../../../models';

interface Item {
  name: string;
  link: AuthRoute;
}

const items = {
  login: {
    name: "Log In",
    link: AuthRoute.SIGN_IN,
  },
  signup: {
    name: "Sign Up",
    link: AuthRoute.SIGN_UP,
  },
  update: {
    name: "Password Update",
    link: AuthRoute.PASSWORD_UPDATE,
  },
  reset: {
    name: "Password Reset",
    link: AuthRoute.PASSWORD_RESET,
  },
  back: {
    name: "Back",
    link: AuthRoute.SIGN_IN,
  },
};

const Navigation: React.FC = () => {
  const [state, setState] = useState<Item[]>([]);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case AuthRoute.PASSWORD_RESET:
        {
          setState([items.reset, items.back]);
        }
        break;
      case AuthRoute.PASSWORD_UPDATE:
        {
          setState([items.update, items.back]);
        }
        break;
      default: {
        setState([items.login, items.signup]);
      }
    }
  }, []);

  return (
    <Menu color="blue" size="huge" secondary pointing widths={2}>
      {state.map(({ name, link }) => {
        const active = location.pathname === link;

        return (
          <Menu.Item
            style={{ cursor: active ? "initial" : "pointer" }}
            active={active}
            key={link}
            name={name}
            onClick={() => !active && history.push(link)}
          />
        );
      })}
    </Menu>
  );
};

export default Navigation;
