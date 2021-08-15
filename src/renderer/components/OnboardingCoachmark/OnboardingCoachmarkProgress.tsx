import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectOnboardingCoachmarkIndex,
  selectOnboardingCoachmarksCount,
} from "../../store/onboarding/selectors";
import { BORDER_RADIUS, BOX_SHADOW_CSS, RHYTHM, theme } from "../../theme";
import { TinyText } from "../TinyText";

export const OnboardingCoachmarkProgress = (): ReactElement => {
  const onboardingCoachmarkIndex = useSelector(selectOnboardingCoachmarkIndex);
  const progress = onboardingCoachmarkIndex + 1;
  const onboardingCoachmarkCount = useSelector(selectOnboardingCoachmarksCount);

  return (
    <Container>
      <ProgressBar
        progressPercent={(100 * progress) / onboardingCoachmarkCount}
      />

      <CountTextContainer>
        <TinyText>{`${progress} / ${onboardingCoachmarkCount}`}</TinyText>
      </CountTextContainer>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  padding: ${RHYTHM / 4}px;
  background-color: ${theme.white5};
  border-radius: ${BORDER_RADIUS / 2}px;
  justify-content: center;
  position: relative;
`;

interface ProgressBarProps {
  progressPercent: number;
}

const ProgressBar = styled.div<ProgressBarProps>`
  width: ${({ progressPercent }) => progressPercent}%;
  height: 100%;
  border-radius: ${BORDER_RADIUS / 2}px;
  background-color: ${theme.accent};
  ${BOX_SHADOW_CSS};
`;

const CountTextContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  padding-right: ${RHYTHM / 2}px;
`;
