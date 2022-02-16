import React, {
  ChangeEvent,
  ReactElement,
  TextareaHTMLAttributes,
  useCallback,
  useState,
} from "react";
import styled from "styled-components";
import { FieldLabel } from "./FieldLabel";
import { inputCSS } from "./InputCSS";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  onChangeText: (value: string) => void;
}

export const TextArea = ({
  label,
  onChangeText,
  ...props
}: TextAreaProps): ReactElement => {
  const [isFocussed, setIsFocussed] = useState(false);

  const onFocus = useCallback(() => {
    setIsFocussed(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocussed(false);
  }, []);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
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

const Input = styled.textarea`
  ${inputCSS};
  height: 240px;
  outline: none;
`;
