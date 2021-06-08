import React, { ReactElement, useCallback } from "react";
import styled from "styled-components";
import { RHYTHM } from "../theme";
import { inputCSS, InputCSSProps } from "./InputCSS";
import { SmallButton } from "./SmallButton";

interface ColourEditorProps {
  colour: string;
  onChange: (colour: string) => void;
}

export const ColourEditor = ({
  colour,
  onChange,
}: ColourEditorProps): ReactElement => {
  const onEditClick = useCallback(() => {}, []);

  return (
    <Container focussed={false} colour={colour}>
      <ButtonContainer>
        <SmallButton onClick={onEditClick}>EDIT</SmallButton>
      </ButtonContainer>
    </Container>
  );
};

interface ContainerProps extends InputCSSProps {
  colour: string;
}

const Container = styled.div<ContainerProps>`
  ${inputCSS};
  width: unset;
  align-self: stretch;
  position: relative;
  background-color: ${({ colour }) => colour};
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: ${RHYTHM / 4}px;
  bottom: 0;
  display: flex;
  align-items: center;
`;
