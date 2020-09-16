import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Icon } from "semantic-ui-react";

type LinkIconProps = {
  to: string;
  iconName: string;
};

const LinkIcon: React.FC<LinkIconProps> = ({ to, iconName }) => (
  <Wrapper to={to}>
    <Icon color="grey" name={iconName as any} />
  </Wrapper>
);

const Wrapper = styled(Link)`
  &:hover,
  &:active {
    i {
      color: #4183c4 !important;
    }
  }

  &:active {
    outline: none;
  }

  i {
    min-height: 19px;
  }
`;

export default LinkIcon;
