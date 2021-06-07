import React, { ChangeEvent, ReactElement, useCallback } from "react";
import styled from "styled-components";
import { borderWidth, rhythm, smallBorderRadius, theme } from "../theme";
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
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChangeText(event.target.value);
    },
    [onChangeText],
  );

  return (
    <Container>
      <FieldLabel>{label}</FieldLabel>

      <Input placeholder={placeholder} value={value} onChange={onChange} />
    </Container>
  );
};

const Container = styled.div``;

const Input = styled.input`
  width: 320px;
  border: ${borderWidth}px solid ${theme.black};
  border-radius: ${smallBorderRadius}px;
  background-color: ${theme.backgroundDark};
  font-size: 12px;
  color: ${theme.white};
  outline: none;
  padding: ${rhythm / 2}px;
  text-align: center;
`;
