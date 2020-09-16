import React from "react";
import styled from "styled-components";

const Center = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 400px;
`;

export default Center;
