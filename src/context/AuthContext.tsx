import React, { createContext } from "react";
import useProvideAuth from "../hooks/useAuth";

const AuthContext = createContext({});

const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export { ProvideAuth };
