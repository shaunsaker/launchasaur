import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hideSnackbar } from "../../store/snackbars/actions";
import { SnackbarData, SnackbarType } from "../../store/snackbars/models";
import { selectSnackbars } from "../../store/snackbars/selectors";
import { RHYTHM, TRANSITION_CSS } from "../../theme";
import { objectToArray } from "../../utils/objectToArray";
import { Button, LARGE_BUTTON_HEIGHT } from "../Button";
import { FadeIn } from "../FadeIn";

export const Notifier = (): ReactElement => {
  const dispatch = useDispatch();
  const snackbars = useSelector(selectSnackbars);

  const onSnackbarClick = useCallback(
    (snackbar: SnackbarData) => {
      dispatch(hideSnackbar({ key: snackbar.key }));
    },
    [dispatch],
  );

  return (
    <Container $snackbarCount={Object.keys(snackbars).length}>
      {objectToArray(snackbars)
        .reverse()
        .map((snackbar) => (
          <SnackbarContainer key={snackbar.key}>
            <FadeIn>
              <Button
                icon={
                  snackbar.type === SnackbarType.Success
                    ? "check-circle"
                    : snackbar.type === SnackbarType.Danger
                    ? "exclamation-circle"
                    : undefined
                }
                primary={snackbar.type === SnackbarType.Success}
                danger={snackbar.type === SnackbarType.Danger}
                large
                onClick={() => onSnackbarClick(snackbar)}>
                {snackbar.message}
              </Button>
            </FadeIn>
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
