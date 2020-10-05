import { motion } from 'framer-motion';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useAnimate } from '~/hooks';

import Error from './Error/Error';
import Input from './Input/Input';

type FieldProps = React.HTMLProps<HTMLInputElement> & {
  label?: string;
  icon?: string;
  errors?: (string | boolean | undefined)[];
  name: string;
  position?: number;
};

const config = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ position, type, label, icon, name, errors, onChange }, ref) => {
    const message = errors?.find((error) => !!error);
    const [error, setError] = useState(false);
    const { getAnimateProp } = useAnimate();

    const handleComplete = () => {
      setError(!error);
    };

    const getAdded = () => {
      const count = getAnimateProp("fieldCount");
      return position! > count;
    };

    return (
      <motion.div
        initial={getAdded() && "initial"}
        exit={getAdded() ? "initial" : ""}
        animate="enter"
        className="field"
        variants={config}
      >
        {label && (
          <label className="form-transition" style={{ textAlign: "left" }}>
            {label}
          </label>
        )}

        <Input
          onChange={onChange}
          name={name}
          type={type}
          icon={icon}
          ref={ref}
        />

        <Error uniqKey={name} message={message} onComplete={handleComplete} />
      </motion.div>
    );
  }
);

export default Field;
