import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode, useState } from 'react';
import { Route, Switch } from 'react-router';
import { AnimateProvider } from '~/context/AnimateContext';
import { useMountedEffect } from '~/hooks';

interface TransitionProps {
  path: string;
}

const Transition: React.FC<TransitionProps> = ({ children, path }) => {
  const [content, setContent] = useState<ReactNode>(children);

  useMountedEffect(() => {
    if (path) {
      setContent(null);
    }
  }, [path]);

  return (
    <AnimatePresence onExitComplete={() => setContent(children)}>
      {content}
    </AnimatePresence>
  );
};

const AnimateSwitch: React.FC = ({ children }) => {
  return (
    <Route
      render={({ location }) => (
        <AnimateProvider>
          <Transition path={location.pathname}>
            <Switch location={location}>{children}</Switch>
          </Transition>
        </AnimateProvider>
      )}
    />
  );
};

export default AnimateSwitch;
