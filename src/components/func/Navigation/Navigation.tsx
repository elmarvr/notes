import { AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { Divider, Menu } from 'semantic-ui-react';
import { AuthRoute } from '~/models';

const Border: React.FC = () => (
  <motion.div
    layoutId="border"
    style={{
      bottom: "-2px",
      position: "absolute",
      width: "100%",
      height: "100%",
      borderBottom: "2px solid #2185d0",
    }}
  />
);

interface ItemProps {
  name: string;
  path: string;
}

const Item: React.FC<ItemProps> = ({ name, path }) => {
  const { pathname } = useLocation();
  const active = pathname === path;

  return (
    <Link
      to={path}
      className="item"
      style={{
        color: active ? "#2185d0" : "#000",
        cursor: active ? "initial" : "pointer",
      }}
    >
      {name}
      {active && <Border />}
    </Link>
  );
};

const Navigation: React.FC = () => {
  return (
    <>
      <Menu color="blue" size="huge" secondary pointing widths={2}>
        <AnimateSharedLayout>
          <Switch>
            <Route path={[AuthRoute.SIGN_IN, AuthRoute.SIGN_UP]}>
              <Item name="Sign In" path={AuthRoute.SIGN_IN} />
              <Item name="Sign Up" path={AuthRoute.SIGN_UP} />
            </Route>
            <Route path={[AuthRoute.PASSWORD_RESET]}>
              <Item name="Reset Password" path={AuthRoute.PASSWORD_RESET} />
              <Item name="Back" path={AuthRoute.SIGN_IN} />
            </Route>
          </Switch>
        </AnimateSharedLayout>
      </Menu>
      <Divider hidden />
    </>
  );
};

export default Navigation;
