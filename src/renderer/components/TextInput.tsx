import React, { ChangeEvent, ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import {
  BORDER_WIDTH,
  RHYTHM,
  SMALL_BORDER_RADIUS,
  SMALL_BORDER_WIDTH,
  theme,
  TRANSITION_CSS,
} from "../theme";
import { FieldLabel } from "./FieldLabel";

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}

export const TextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
}: TextInputProps): ReactElement => {
  const [isFocussed, setIsFocussed] = useState(false);

  const onFocus = useCallback(() => {
    setIsFocussed(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocussed(false);
  }, []);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChangeText(event.target.value);
    },
    [onChangeText],
  );

  return (
    <Container>
      <FieldLabel>{label}</FieldLabel>

      <Input
        focussed={isFocussed}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </Container>
  );
};

const Container = styled.div``;

interface InputProps {
  focussed: boolean;
}

const Input = styled.input<InputProps>`
  width: 320px;
  border: ${SMALL_BORDER_WIDTH}px solid
    ${({ focussed }) => (focussed ? theme.accent : theme.black)};
  transition: border-color ${TRANSITION_CSS};
  border-radius: ${SMALL_BORDER_RADIUS}px;
  background-color: ${theme.backgroundDark};
  font-size: 14px;
  font-weight: bold;
  color: ${theme.white};
  outline: none;
  padding: ${RHYTHM / 2}px ${RHYTHM}px;
`;
