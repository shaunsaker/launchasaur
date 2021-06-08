import React, { ChangeEvent, ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import { FieldLabel } from "./FieldLabel";
import { inputCSS } from "./InputCSS";

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

const Input = styled.input`
  ${inputCSS};
  outline: none;
`;
