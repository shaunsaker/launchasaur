import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectOnboardingCoachmarkIndex,
  selectOnboardingCoachmarksCount,
} from "../../store/onboarding/selectors";
import {
  BOX_SHADOW_CSS,
  RHYTHM,
  SMALL_BORDER_RADIUS,
  theme,
} from "../../theme";
import { SubtitleText } from "../SubtitleText";

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
        <SubtitleText>{`${progress} / ${onboardingCoachmarkCount}`}</SubtitleText>
      </CountTextContainer>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  padding: ${RHYTHM / 4}px;
  background-color: ${theme.white5};
  border-radius: ${SMALL_BORDER_RADIUS}px;
  justify-content: center;
  position: relative;
`;

interface ProgressBarProps {
  progressPercent: number;
}

const ProgressBar = styled.div<ProgressBarProps>`
  width: ${({ progressPercent }) => progressPercent}%;
  height: 100%;
  border-radius: ${SMALL_BORDER_RADIUS}px;
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
