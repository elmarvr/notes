import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const message = {
  enter: {
    scale: 1,
    transition: {
      delay: 0.3,
    },
  },
  exit: {
    scale: 0,
  },
};

interface ErrorMessageProps {
  error: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, error }) => (
  <AnimatePresence>
    {error && (
      <motion.div
        initial="exit"
        animate="enter"
        exit="exit"
        variants={message}
        className="ui message error"
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export default ErrorMessage;
