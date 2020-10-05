import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

const scaleConfig = {
  initial: {
    scale: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

interface LinkMessageProps {
  to: string;
}

const LinkMessage: React.FC<LinkMessageProps> = ({ children, to }) => (
  <motion.div
    initial="initial"
    animate="scale"
    exit="initial"
    variants={scaleConfig}
    className="ui segment"
  >
    <Link to={to}>{children}</Link>
  </motion.div>
);

export default LinkMessage;
