import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { navigateTo } from "../store/navigation/actions";
import { Routes } from "../store/navigation/routes";
import { BORDER_WIDTH, RHYTHM, theme } from "../theme";
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

const HZ_MARGIN = RHYTHM / 2;

const HeaderBarContainer = styled.div`
  padding-left: ${HZ_MARGIN}px;
  border-bottom-width: ${BORDER_WIDTH / 2}px;
  border-bottom-style: solid;
  border-bottom-color: ${theme.black};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

const LogoText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${theme.white};
`;

const CloseIconContainer = styled.div`
  margin-right: ${-HZ_MARGIN}px;
`;
