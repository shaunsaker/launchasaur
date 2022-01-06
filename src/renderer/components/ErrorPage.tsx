import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { SUPPORT_EMAIL } from "../config";
import { openLink } from "../store/ipc/actions";
import { navigateTo } from "../store/navigation/actions";
import { Routes } from "../store/navigation/models";
import { RHYTHM } from "../theme";
import { BlankState } from "./BlankState";
import { Button } from "./Button";
import { WindowContainer } from "./WindowContainer";
import { MarginContainer } from "./MarginContainer";

interface ErrorPageProps {
  error?: string;
  resetError?: () => void;
}

export const ErrorPage = ({
  error,
  resetError,
}: ErrorPageProps): ReactElement => {
  const dispatch = useDispatch();

  const onContactSupportClick = useCallback(() => {
    dispatch(openLink.request({ url: `mailto: ${SUPPORT_EMAIL}` }));
    resetError();
  }, [dispatch, resetError]);

  const onGoHomeClick = useCallback(() => {
    dispatch(navigateTo({ to: Routes.root }));
    resetError();
  }, [dispatch, resetError]);

  return (
    <WindowContainer>
      <Container>
        <BlankState
          icon="exclamation"
          title="Uh Oh!"
          description={
            error ||
            "We're not sure how you got here but if the issue persists, please contact Support."
          }>
          <ButtonsContainer>
            <MarginContainer small>
              <Button large onClick={onContactSupportClick}>
                CONTACT SUPPORT
              </Button>
            </MarginContainer>

            <Button large primary onClick={onGoHomeClick}>
              GO HOME
            </Button>
          </ButtonsContainer>
        </BlankState>
      </Container>
    </WindowContainer>
  );
};

const Container = styled.div`
  padding: ${RHYTHM}px;
`;

const ButtonsContainer = styled.div`
  margin-top: ${RHYTHM}px;
`;
