import React, { createContext, Dispatch, SetStateAction } from 'react';

import useProvideAnimate from '../hooks/useProvideAnimate';

type Context = ReturnType<typeof useProvideAnimate>;

const AnimateContext = createContext<Context>({} as Context);

const AnimateProvider: React.FC = ({ children }) => {
  return (
    <AnimateContext.Provider value={useProvideAnimate()}>
      {children}
    </AnimateContext.Provider>
  );
};

export default AnimateContext;

export { AnimateProvider };
