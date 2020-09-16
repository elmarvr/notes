import styled from "styled-components";
import { Link } from "react-router-dom";

const Anchor = styled(Link).attrs({ className: "ui primary" })`
  color: #4183c4;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default Anchor;
