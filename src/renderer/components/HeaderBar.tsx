import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { navigateTo } from "../store/navigation/actions";
import { Routes } from "../store/navigation/routes";
import { BORDER_WIDTH, BOX_SHADOW_CSS, RHYTHM, theme } from "../theme";
import { CloseIcon } from "./CloseIcon";

interface HeaderBarProps {}

export const HeaderBar = ({}: HeaderBarProps) => {
  const dispatch = useDispatch();

  const onCloseClick = useCallback(() => {
    dispatch(navigateTo({ to: Routes.root }));
  }, [dispatch]);

  return (
    <HeaderBarContainer>
      <LogoText>LAUNCHASAUR</LogoText>

      <CloseIconContainer>
        <CloseIcon onClick={onCloseClick} />
      </CloseIconContainer>
    </HeaderBarContainer>
  );
};

const HeaderBarContainer = styled.div`
  padding-left: ${RHYTHM}px;
  border-bottom-width: ${BORDER_WIDTH}px;
  border-bottom-style: solid;
  border-bottom-color: ${theme.black};
  ${BOX_SHADOW_CSS};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${theme.white};
`;

const CloseIconContainer = styled.div``;
