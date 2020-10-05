import { motion } from 'framer-motion';
import React, { FormEvent } from 'react';
import { Segment } from 'semantic-ui-react';

import Title from './Title/Title';

interface WidgetProps {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  disabled?: boolean;
}

const Widget: React.FC<WidgetProps> = ({ children }) => (
  <>
    <Title />
    <Segment>{children}</Segment>
  </>
);

export default Widget;
