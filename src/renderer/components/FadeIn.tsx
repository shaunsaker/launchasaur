import React, { ReactElement } from "react";
import { ANIMATION_DURATION_MS } from "../theme";
import { AnimationTypes, Animator } from "./Animator";

interface FadeInProps {
  children: ReactElement;
}

export const FadeIn = ({ children }: FadeInProps): ReactElement => {
  return (
    <Animator
      animationType={AnimationTypes.opacity}
      initialValue={0}
      finalValue={1}
      animateIn
      duration={ANIMATION_DURATION_MS}>
      {children}
    </Animator>
  );
};
