import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface ErrorProps {
  message?: string | boolean;
  onComplete: () => void;
}

const container = {
  enter: {
    height: "auto",
    transition: {
      delay: 0.2,
      duration: 0.3,
      when: "beforeChildren",
    },
  },
  exit: {
    height: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  },
};

const label = {
  enter: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Error: React.FC<ErrorProps> = ({ message, onComplete }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial="exit"
          animate="enter"
          exit="exit"
          variants={container}
          onAnimationComplete={onComplete}
        >
          <motion.div variants={label} className="ui label prompt pointing">
            {message}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Error;
