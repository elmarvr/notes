import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type ProtectedRouteProps = RouteProps & {
  redirect: string;
  open: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  component,
  open,
  redirect,
  ...rest
}) => {
  const Component = component as React.FC;

  return (
    <Route {...rest}>{open ? <Component /> : <Redirect to={redirect} />}</Route>
  );
};

export default ProtectedRoute;
