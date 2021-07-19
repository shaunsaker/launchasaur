import { IconName } from "@fortawesome/fontawesome-svg-core"; // eslint-disable-line
import React from "react";
import styled from "styled-components";
import { RHYTHM, theme } from "../theme";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

interface HeaderBarProps {
  title: string;
  icon: IconName;
  onClick: () => void;
}

export const HeaderBar = ({ title, icon, onClick }: HeaderBarProps) => {
  return (
    <Container>
      <Logo />

      <TitleText>{title}</TitleText>

      <Icon icon={icon} onClick={onClick} />
    </Container>
  );
};

const Container = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${RHYTHM}px;
`;

const TitleText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.white};
`;
