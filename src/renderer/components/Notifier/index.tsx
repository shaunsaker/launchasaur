import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectSnackbars } from "../../store/snackbars/selectors";
import { RHYTHM, TRANSITION_CSS } from "../../theme";
import { objectToArray } from "../../utils/objectToArray";
import { LARGE_BUTTON_HEIGHT } from "../Button";
import { Snackbar } from "./Snackbar";

export const Notifier = (): ReactElement => {
  const snackbars = useSelector(selectSnackbars);

  return (
    <Container $snackbarCount={Object.keys(snackbars).length}>
      {objectToArray(snackbars)
        .reverse()
        .map((snackbar) => (
          <SnackbarContainer key={snackbar.key}>
            <Snackbar snackbar={snackbar} />
          </SnackbarContainer>
        ))}
    </Container>
  );
};

const SNACKBAR_VT_MARGIN = RHYTHM;

const getTranslateY = (snackbarCount: number): number =>
  (snackbarCount - 1) * (LARGE_BUTTON_HEIGHT + SNACKBAR_VT_MARGIN);

interface ContainerProps {
  $snackbarCount: number;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  left: 50%;
  top: ${({ $snackbarCount }) => -1 * getTranslateY($snackbarCount)}px;
  transform: translate(
    -50%,
    ${({ $snackbarCount }) => getTranslateY($snackbarCount)}px
  );
  transition: transform ${TRANSITION_CSS};
`;

const SnackbarContainer = styled.div`
  margin-top: ${SNACKBAR_VT_MARGIN}px;
`;
