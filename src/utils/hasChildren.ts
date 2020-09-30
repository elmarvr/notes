import React, { ReactNode } from 'react';

const hasChildren = (children: ReactNode) =>
  React.Children.toArray(children).filter(Boolean).length > 0;

export { hasChildren };
