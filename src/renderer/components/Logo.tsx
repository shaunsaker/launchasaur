import React, { ReactElement } from "react";
import styled from "styled-components";
import { theme } from "../theme";

interface LogoProps {}

export const Logo = ({}: LogoProps): ReactElement => {
  return <Container />;
};

const SIZE = 64;

const Container = styled.div`
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  background-color: ${theme.accent};
`;
