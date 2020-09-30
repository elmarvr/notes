import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const Title: React.FC = () => (
  <Header as="h2" color="blue">
    <Icon name="sticky note outline" />
    Notes
  </Header>
);

export default Title;
