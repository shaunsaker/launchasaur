import {
  IconName,
  // @ts-expect-error it exists
  FontAwesomeIconProps,
} from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import { BOX_SHADOW_CSS, FLEX_CENTER_CSS, ICON_SIZE, theme } from "../theme";

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

const SIZE = ICON_SIZE * 2;
const Container = styled.div<ContainerProps>`
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  background-color: ${theme.backgroundDark};
  ${FLEX_CENTER_CSS}
  ${BOX_SHADOW_CSS}
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: ${ICON_SIZE}px;
  color: ${theme.white};
`;
