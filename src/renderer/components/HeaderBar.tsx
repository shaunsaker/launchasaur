import { IconName } from "@fortawesome/fontawesome-svg-core"; // eslint-disable-line
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectEditLauncherModalIsShown } from "../store/editLauncherModal/selectors";
import { selectIsLaunchStationRoute } from "../store/navigation/selectors";
import { OnboardingCoachmarkKey } from "../store/onboarding/models";
import { RHYTHM, theme } from "../theme";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { OnboardingCoachmark } from "./OnboardingCoachmark";
import { TitleText } from "./TitleText";

interface HeaderBarProps {
  title: string;
  icon: IconName;
  onClick: () => void;
}

export const HeaderBar = ({ title, icon, onClick }: HeaderBarProps) => {
  const isEditLauncherModalShown = useSelector(selectEditLauncherModalIsShown);
  const isLaunchStationRoute = useSelector(selectIsLaunchStationRoute);

  return (
    <Container>
      <Logo />

      <Text>{title}</Text>

      <OnboardingCoachmark
        shouldRender={(key) => key === OnboardingCoachmarkKey.OpenControlPanel}>
        <OnboardingCoachmark
          shouldRender={(key) =>
            key === OnboardingCoachmarkKey.CloseControlPanel &&
            !isEditLauncherModalShown &&
            !isLaunchStationRoute
          }>
          <Icon icon={icon} onClick={onClick} />
        </OnboardingCoachmark>
      </OnboardingCoachmark>
    </Container>
  );
};

const Container = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${RHYTHM}px;
`;

const Text = styled(TitleText)`
  font-size: 18px;
`;
