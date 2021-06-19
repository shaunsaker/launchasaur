import React, {
  ChangeEvent,
  InputHTMLAttributes,
  ReactElement,
  useCallback,
  useState,
} from "react";
import styled from "styled-components";
import { FieldLabel } from "./FieldLabel";
import { inputCSS } from "./InputCSS";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChangeText: (value: string) => void;
}

export const TextInput = ({
  label,
  onChangeText,
  ...props
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
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
    </Container>
  );
};

const Container = styled.div``;

const Input = styled.input`
  ${inputCSS};
  outline: none;
`;
