import React from "react";
import styled from "styled-components";

import { Card } from "semantic-ui-react";
import LinkIcon from "../LinkIcon/LinkIcon";

type BackHeaderProps = {
  to: string;
  title: string;
};

const BackHeader: React.FC<BackHeaderProps> = ({ to, title }) => (
  <HeaderContainer>
    <LinkIcon to={to} iconName="arrow left" />
    <Card.Header>&nbsp;</Card.Header>
    <Card.Header>{title}</Card.Header>
  </HeaderContainer>
);

const HeaderContainer = styled(Card.Content)`
  display: flex;
  align-items: center;

  div:not(:last-child) {
    opacity: 0;
    cursor: initial;
  }
  div:last-child {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: red;
  }
`;

export default BackHeader;
