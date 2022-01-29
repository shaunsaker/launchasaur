import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  hideOnboardingOutroModal,
  setHasCompletedOnboarding,
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

export const OnboardingOutroModal = (): ReactElement => {
  const dispatch = useDispatch();

  const onDoneClick = useCallback(() => {
    dispatch(hideOnboardingOutroModal());
    dispatch(setHasCompletedOnboarding());
  }, [dispatch]);

  return (
    <Modal>
      <Container>
        <div style={{ fontSize: 48, marginBottom: RHYTHM }}>🚀🎉</div>

        <ContentContainer>
          <MarginContainer small>
            <ParagraphText>
              Yay! Thanks to you, {ONBOARDING_CHARACTER} escaped{" "}
              {ONBOARDING_PLANET} from the {ONBOARDING_ENEMY}!
            </ParagraphText>
          </MarginContainer>

          <MarginContainer small>
            <ParagraphText>
              That's brings us to the end of our tutorial. We hope you learnt
              enough to get started 🤓
            </ParagraphText>
          </MarginContainer>

          <MarginContainer>
            <ParagraphText>
              If at any time you need any help, we are only an email away 📧 God
              speed!
            </ParagraphText>
          </MarginContainer>
        </ContentContainer>

        <MarginContainer small>
          <Button large primary onClick={onDoneClick}>
            DONE
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
