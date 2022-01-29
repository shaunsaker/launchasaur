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
import { MAX_TEXT_WIDTH, RHYTHM } from "../../theme";
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

  const onClose = useCallback(() => {
    dispatch(hideOnboardingIntroModal());
    dispatch(setHasCompletedOnboarding());
  }, [dispatch]);

  const onCancelClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal onClose={onClose}>
      <Container>
        <div style={{ fontSize: 48, marginBottom: RHYTHM }}>👾🦕👾</div>

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
            <ParagraphText>Can you help {ONBOARDING_CHARACTER}?</ParagraphText>
          </MarginContainer>
        </ContentContainer>

        <MarginContainer small>
          <Button large primary shouldPlaySound onClick={onContinueClick}>
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

const ContentContainer = styled.div`
  max-width: ${MAX_TEXT_WIDTH}px;
  text-align: center;
`;
