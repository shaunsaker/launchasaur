import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SUPPORT_EMAIL } from "../config";
import { selectIsAuthenticated } from "../store/auth/selectors";
import { openLink } from "../store/ipc/actions";
import { navigateTo } from "../store/navigation/actions";
import { Routes } from "../store/navigation/models";
import { RHYTHM } from "../theme";
import { BlankState } from "./BlankState";
import { Button } from "./Button";
import { CircularWindow } from "./CircularWindow";
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
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const onContactSupportClick = useCallback(() => {
    dispatch(openLink.request({ url: `mailto: ${SUPPORT_EMAIL}` }));
    resetError();
  }, [dispatch, resetError]);

  const onGoHomeClick = useCallback(() => {
    dispatch(navigateTo({ to: isAuthenticated ? Routes.root : Routes.login }));
    resetError();
  }, [dispatch, isAuthenticated, resetError]);

  return (
    <CircularWindow>
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
    </CircularWindow>
  );
};

const Container = styled.div`
  padding: ${RHYTHM}px;
`;

const ButtonsContainer = styled.div`
  margin-top: ${RHYTHM}px;
`;
