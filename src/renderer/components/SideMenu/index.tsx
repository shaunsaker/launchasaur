import React, { ReactNode } from "react";
import styled from "styled-components";
import { BORDER_WIDTH, RHYTHM, theme } from "../../theme";
import { SideMenuOption } from "./SideMenuOption";

interface Option {
  value: string;
  selected: boolean;
}

interface SideMenuProps {
  title?: string;
  options: Option[];
  onOptionClick: (option: Option) => void;
  children?: ReactNode;
}

export const SideMenu = ({
  title,
  options,
  onOptionClick,
  children,
}: SideMenuProps) => {
  return (
    <SideMenuContainer>
      {title && <TitleText>{title}</TitleText>}

      {options.map((option) => (
        <SideMenuOption
          key={option.value}
          selected={option.selected}
          onClick={() => onOptionClick(option)}>
          {option.value}
        </SideMenuOption>
      ))}

      {children}
    </SideMenuContainer>
  );
};

const SideMenuContainer = styled.div`
  align-self: flex-start;
  height: 100%;
  border-right: ${BORDER_WIDTH}px solid ${theme.black};
  padding: ${RHYTHM}px;
`;

const TitleText = styled.div``;
