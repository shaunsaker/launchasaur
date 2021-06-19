import React, { ReactNode } from "react";
import styled from "styled-components";
import { BORDER_WIDTH, RHYTHM, theme } from "../../theme";
import { MarginContainer } from "../MarginContainer";
import { SideMenuOption, SIDE_MENU_OPTION_MARGIN } from "./SideMenuOption";

export interface SideMenuOption {
  id: string;
  title: string;
  selected: boolean;
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
      {title && (
        <MarginContainer small>
          <TitleText>{title}</TitleText>
        </MarginContainer>
      )}

      {options.map((option) => (
        <SideMenuOption
          key={option.id}
          selected={option.selected}
          onClick={() => onOptionClick(option)}>
          {option.title}
        </SideMenuOption>
      ))}

      {children}
    </SideMenuContainer>
  );
};

const SideMenuContainer = styled.div`
  align-self: flex-start;
  height: 100%;
  border-right: ${BORDER_WIDTH}px solid ${theme.backgroundDark33};
  padding: ${RHYTHM}px;
`;

const TitleText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${theme.white50};
  margin-top: ${SIDE_MENU_OPTION_MARGIN}px;
`;
