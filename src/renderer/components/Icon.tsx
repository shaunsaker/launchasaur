import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { flexCenterCSS, theme } from "../theme";

interface IconProps {
  icon: IconName;
}

export const Icon = ({ icon }: IconProps) => {
  return (
    <Container>
      <StyledIcon icon={icon || "question"} />
    </Container>
  );
};

const SIZE = 36;
const Container = styled.div`
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  background-color: ${theme.backgroundDark};
  ${flexCenterCSS}
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: ${theme.white};
`;
