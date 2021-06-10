import React, { ReactNode } from "react";
import styled from "styled-components";
import { BORDER_WIDTH, RHYTHM, theme } from "../../theme";
import { SideMenuOption } from "./SideMenuOption";

export interface SideMenuOption {
  value: string;
  selected: boolean;
  route: string;
}

interface SideMenuProps {
  title?: string;
  options: SideMenuOption[];
  onOptionClick: (option: SideMenuOption) => void;
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
