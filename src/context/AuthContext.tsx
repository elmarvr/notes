import React, { createContext } from "react";
import { useAuth } from "../hooks";

type Context = ReturnType<typeof useAuth>;

const AuthContext = createContext<Context>({} as Context);

const AuthProvider: React.FC = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export { AuthProvider };
