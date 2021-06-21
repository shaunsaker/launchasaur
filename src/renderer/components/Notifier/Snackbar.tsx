import React, { ReactElement, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideSnackbar } from "../../store/snackbars/actions";
import { SnackbarData, SnackbarType } from "../../store/snackbars/models";
import { Button } from "../Button";
import { FadeIn } from "../FadeIn";

const SNACKBAR_DURATION = 4000;

interface SnackbarProps {
  snackbar: SnackbarData;
}

export const Snackbar = ({ snackbar }: SnackbarProps): ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(hideSnackbar({ key: snackbar.key }));
    }, SNACKBAR_DURATION);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, snackbar.key]);

  const onSnackbarClick = useCallback(() => {
    dispatch(hideSnackbar({ key: snackbar.key }));
  }, [dispatch, snackbar.key]);

  return (
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
        onClick={onSnackbarClick}>
        {snackbar.message}
      </Button>
    </FadeIn>
  );
};
