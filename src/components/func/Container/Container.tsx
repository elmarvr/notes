import React from 'react';
import { Grid } from 'semantic-ui-react';

const Container: React.FC = ({ children }) => (
  <Grid
    textAlign="center"
    style={{
      position: "relative",
      left: "50%",
      top: "15vh",
      transform: "translateX(-50%)",
      maxWidth: "450px",
    }}
  >
    <Grid.Column>{children}</Grid.Column>
  </Grid>
);

export default Container;
