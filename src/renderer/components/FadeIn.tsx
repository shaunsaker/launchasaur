import React, { ReactElement } from "react";
import { animationDuration } from "../theme";
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
      duration={animationDuration}>
      {children}
    </Animator>
  );
};
