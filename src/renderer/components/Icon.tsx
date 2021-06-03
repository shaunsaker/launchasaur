import {
  IconName,
  // @ts-expect-error it exists
  FontAwesomeIconProps,
} from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import {
  smallBorderWidth,
  boxShadowCSS,
  flexCenterCSS,
  theme,
  transitionCSS,
} from "../theme";

interface IconProps extends FontAwesomeIconProps {
  icon: IconName;
  isClickable?: boolean;
  onClick?: () => void;
}

export const Icon = ({ icon, isClickable, onClick, ...props }: IconProps) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <Container
      ref={hoverRef}
      hovered={isClickable && isHovered}
      onClick={isClickable ? onClick : null}>
      <StyledIcon icon={icon || "question"} {...props} />
    </Container>
  );
};

interface ContainerProps {
  hovered: boolean;
}

const SIZE = 36;
const Container = styled.div<ContainerProps>`
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  background-color: ${theme.backgroundDark};
  border: ${smallBorderWidth}px solid
    ${({ hovered }) => (hovered ? theme.accent : "transparent")};
  ${flexCenterCSS}
  ${boxShadowCSS}
  transition: border ${transitionCSS}
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: ${theme.white};
`;
