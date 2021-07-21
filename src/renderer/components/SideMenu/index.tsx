import React, { ReactNode } from "react";
import styled from "styled-components";
import { BORDER_WIDTH, RHYTHM, theme } from "../../theme";
import { MarginContainer } from "../MarginContainer";
import { SideMenuOption } from "./SideMenuOption";

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

export const SIDE_MENU_PADDING_TOP = RHYTHM * 2;

const SideMenuContainer = styled.div`
  align-self: flex-start;
  height: 100%;
  border-right: ${BORDER_WIDTH}px solid ${theme.backgroundDark33};
  padding: ${SIDE_MENU_PADDING_TOP}px ${RHYTHM}px ${RHYTHM}px;
`;

const TitleText = styled.div`
  font-size: 16px;
  line-height: 16px;
  font-weight: bold;
  color: ${theme.white50};
`;
