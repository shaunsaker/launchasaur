import {
  IconName,
  // @ts-expect-error it exists
  FontAwesomeIconProps,
} from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { boxShadowCSS, flexCenterCSS, theme } from "../theme";

interface IconProps extends FontAwesomeIconProps {
  icon: IconName;
}

export const Icon = ({ icon, ...props }: IconProps) => {
  return (
    <Container>
      <StyledIcon icon={icon || "question"} {...props} />
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
  ${boxShadowCSS}
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: ${theme.white};
`;
