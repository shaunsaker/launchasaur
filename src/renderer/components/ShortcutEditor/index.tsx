import isAccelerator from "electron-is-accelerator";
import React, { ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import { RHYTHM } from "../../theme";
import { inputCSS } from "../InputCSS";
import { SmallButton } from "../SmallButton";
import { useListenForKeyboardShortcutCombination } from "./useListenForKeyboardShortcutCombination";

interface EditShortcutModalProps {
  shortcut: string;
  onChange: (shortcut: string) => void;
}

export const ShortcutEditor = ({
  shortcut,
  onChange,
}: EditShortcutModalProps): ReactElement => {
  console.log({ shortcut, onChange });
  const [isListening, setIsListening] = useState(false);

  const onClearClick = useCallback(() => {
    onChange("");
  }, [onChange]);

  const onEditClick = useCallback(() => {
    setIsListening(true);
  }, []);

  const onStopClick = useCallback(() => {
    setIsListening(false);
  }, []);

  const onChangeShortcut = useCallback(
    (newShortcut: string) => {
      setIsListening(false);

      const isValidShortcut = isAccelerator(newShortcut);

      if (isValidShortcut) {
        onChange(newShortcut);
      }
    },
    [onChange],
  );

  useListenForKeyboardShortcutCombination(isListening, onChangeShortcut);

  return (
    <Container focussed={isListening}>
      {isListening ? "Listening..." : shortcut}

      <ButtonsContainer>
        {isListening ? (
          <SmallButton onClick={onStopClick}>STOP</SmallButton>
        ) : (
          <>
            <ButtonContainer>
              <SmallButton danger onClick={onClearClick}>
                CLEAR
              </SmallButton>
            </ButtonContainer>

            <SmallButton onClick={onEditClick}>EDIT</SmallButton>
          </>
        )}
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled.div`
  ${inputCSS};
  position: relative;
`;

const ButtonsContainer = styled.div`
  position: absolute;
  top: 0;
  right: ${RHYTHM / 4}px;
  bottom: 0;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-right: ${RHYTHM / 4}px;
`;
