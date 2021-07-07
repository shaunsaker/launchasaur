import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useHover } from "use-hooks";
import { HomeRouteParams } from "..";
import { DEFAULT_LAUNCH_STATION_ID } from "../../../store/launchStations/models";
import { selectLaunchStation } from "../../../store/launchStations/selectors";
import { navigateBack, navigateTo } from "../../../store/navigation/actions";
import { Routes } from "../../../store/navigation/models";
import { ApplicationState } from "../../../store/reducers";
import {
  BORDER_WIDTH,
  FLEX_CENTER_CSS,
  RHYTHM,
  TEXT_ELLIPSIS_CSS,
  theme,
  TRANSITION_CSS,
} from "../../../theme";
import { Icon } from "../../Icon";
import { Logo } from "../../Logo";

interface LogoButtonProps {
  diameter: number;
}

export const CenterButton = ({ diameter }: LogoButtonProps): ReactElement => {
  const dispatch = useDispatch();
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const { launchStationId } = useParams<HomeRouteParams>();
  const isSubmenuShown = launchStationId !== DEFAULT_LAUNCH_STATION_ID;
  const launchStation = useSelector((state: ApplicationState) =>
    selectLaunchStation(state, launchStationId),
  );

  const onClick = useCallback(() => {
    if (isSubmenuShown) {
      dispatch(navigateBack());
    } else {
      dispatch(navigateTo({ to: Routes.settingsLaunchStations }));
    }
  }, [dispatch, isSubmenuShown]);

  return (
    <Container
      ref={hoverRef}
      diameter={diameter}
      hovered={isHovered}
      onClick={onClick}>
      <InnerContainer>
        {isSubmenuShown ? (
          <>
            <Icon icon="times" />

            <CenterButtonTitleText $diameter={diameter}>
              {launchStation?.title}
            </CenterButtonTitleText>
          </>
        ) : (
          <>
            <Logo />

            <CenterButtonTitleText $diameter={diameter}>
              Settings
            </CenterButtonTitleText>
          </>
        )}
      </InnerContainer>
    </Container>
  );
};

interface ContainerProps {
  diameter: number;
  hovered: boolean;
}

const Container = styled.div<ContainerProps>`
  width: ${({ diameter }) => diameter}px;
  height: ${({ diameter }) => diameter}px;
  border-radius: ${({ diameter }) => diameter / 2}px;
  border-width: ${BORDER_WIDTH}px;
  border-style: solid;
  border-color: ${theme.black};
  background-color: ${({ hovered }) =>
    hovered ? theme.backgroundLightOpaque : theme.backgroundDarkOpaque};
  transition: background-color ${TRANSITION_CSS};
  cursor: pointer;
  color: ${theme.white};
  ${FLEX_CENTER_CSS}
`;

const InnerContainer = styled.div`
  ${FLEX_CENTER_CSS}
`;

interface CenterButtonTitleTextProps {
  $diameter: number;
}

const CenterButtonTitleText = styled.div<CenterButtonTitleTextProps>`
  margin-top: ${RHYTHM / 2}px;
  font-size: 16px;
  font-weight: bold;
  color: ${theme.white};
  ${TEXT_ELLIPSIS_CSS};
  width: ${({ $diameter }) => $diameter - RHYTHM * 2}px;
  text-align: center;
`;