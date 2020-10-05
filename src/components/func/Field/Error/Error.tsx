import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface ErrorProps {
  uniqKey: string;
  message?: string | boolean;
  onComplete: () => void;
}

const expandConfig = {
  initial: {
    height: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  },
  expand: {
    height: "auto",
    transition: {
      delay: 0.2,
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};

const labelConfig = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  expand: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const Error: React.FC<ErrorProps> = ({ message, onComplete }) => {
  const [label, setLabel] = useState(message);

  useEffect(() => {
    if (message) {
      setLabel(message);
    }
  }, [message]);

  return (
    <>
      <motion.div
        initial="initial"
        animate={message ? "expand" : "initial"}
        exit={message ? "initial" : ""}
        variants={expandConfig}
        onAnimationComplete={onComplete}
      >
        <motion.div
          layout
          variants={labelConfig}
          className="ui label prompt pointing"
        >
          {label}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Error;
