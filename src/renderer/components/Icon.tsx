import {
  IconName,
  // @ts-expect-error it exists
  FontAwesomeIconProps,
} from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { ICON_SIZE, theme } from "../theme";
import { Circle } from "./Circle";

interface IconProps extends FontAwesomeIconProps {
  icon: IconName;
  isClickable?: boolean;
  onClick?: () => void;
}

export const Icon = ({ icon, isClickable, onClick, ...props }: IconProps) => {
  return (
    <Circle onClick={isClickable ? onClick : null}>
      <StyledIcon icon={icon || "question"} {...props} />
    </Circle>
  );
};

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: ${ICON_SIZE}px;
  color: ${theme.white};
`;
