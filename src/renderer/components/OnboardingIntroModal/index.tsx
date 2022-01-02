import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  hideOnboardingIntroModal,
  setHasCompletedOnboarding,
  showOnboardingCoachmarks,
} from "../../store/onboarding/actions";
import {
  ONBOARDING_CHARACTER,
  ONBOARDING_ENEMY,
  ONBOARDING_PLANET,
} from "../../store/onboarding/models";
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  MAX_TEXT_WIDTH,
  RHYTHM,
  theme,
} from "../../theme";
import { Button } from "../Button";
import { MarginContainer } from "../MarginContainer";
import { Modal } from "../Modal";
import { ParagraphText } from "../ParagraphText";

export const OnboardingIntroModalModal = (): ReactElement => {
  const dispatch = useDispatch();

  const onContinueClick = useCallback(() => {
    dispatch(hideOnboardingIntroModal());
    dispatch(showOnboardingCoachmarks());
  }, [dispatch]);

  const onCancelClick = useCallback(() => {
    dispatch(hideOnboardingIntroModal());
    dispatch(setHasCompletedOnboarding());
  }, [dispatch]);

  return (
    <Modal>
      <Container>
        {/* TODO: illustration */}
        <Illustration />

        <ContentContainer>
          <MarginContainer>
            <ParagraphText>
              {ONBOARDING_CHARACTER} is stranded on {ONBOARDING_PLANET} and
              there are {ONBOARDING_ENEMY} everywhere 😱 You need to help him
              escape by building a Launcher that you can use to launch him into
              outer space 🚀
            </ParagraphText>
          </MarginContainer>

          <MarginContainer>
            <ParagraphText>
              Can you help {ONBOARDING_CHARACTER} escape from the{" "}
              {ONBOARDING_ENEMY} on {ONBOARDING_PLANET}?
            </ParagraphText>
          </MarginContainer>
        </ContentContainer>

        <MarginContainer small>
          <Button large primary onClick={onContinueClick}>
            HELP {ONBOARDING_CHARACTER.toUpperCase()}! 💪
          </Button>
        </MarginContainer>

        <MarginContainer small>
          <Button large danger onClick={onCancelClick}>
            SKIP AND LET {ONBOARDING_CHARACTER.toUpperCase()} DIE ALONE...
            FOREVER 😢
          </Button>
        </MarginContainer>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  align-items: center;
`;

const Illustration = styled.img`
  width: 160px;
  height: 160px;
  border: ${BORDER_WIDTH}px solid ${theme.black};
  border-radius: ${BORDER_RADIUS}px;
  background-color: ${theme.backgroundLight};
  margin-bottom: ${RHYTHM}px;
`;

const ContentContainer = styled.div`
  max-width: ${MAX_TEXT_WIDTH}px;
  text-align: center;
`;
