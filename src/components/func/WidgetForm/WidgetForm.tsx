import { motion, useIsPresent, Variants } from 'framer-motion';
import React, { FormEvent, ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { Button, Divider, Form } from 'semantic-ui-react';
import AuthContext from '~/context/AuthContext';
import { useAnimate } from '~/hooks';

const formConfig: Variants = {
  enter: ({ prevHeight }) => ({
    height: prevHeight,
  }),
  expand: {
    height: "auto",
    transition: {
      duration: 0.3,
    },
  },
  exit: ({ height }) => ({
    height,
  }),
};

interface WidgetFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const WidgetForm: React.FC<WidgetFormProps> = ({ children, onSubmit }) => {
  const { auth } = useContext(AuthContext);
  const isPresent = useIsPresent();
  const ref = useRef<HTMLDivElement | null>(null);

  const { setAnimateProp, getAnimateProp } = useAnimate();

  useEffect(() => {
    if (!isPresent) {
      setAnimateProp("prevHeight", ref.current?.clientHeight);
      setAnimateProp("fieldCount", React.Children.count(children));
    }
  }, [isPresent]);

  const height = ref.current ? ref.current.clientHeight : 0;
  const prevHeight = getAnimateProp("prevHeight");

  return (
    <Form error size="large" onSubmit={onSubmit}>
      <motion.div
        ref={ref}
        custom={{
          height,
          prevHeight,
        }}
        initial="enter"
        animate={isPresent ? "expand" : "exit"}
        style={{ overflow: "hidden" }}
        exit="exit"
        variants={formConfig}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child as ReactElement, {
            position: index + 1,
          });
        })}
      </motion.div>

      <Divider hidden />

      <Button loading={auth.loading} color="blue" size="large" fluid>
        Submit
      </Button>
    </Form>
  );
};

export default WidgetForm;
