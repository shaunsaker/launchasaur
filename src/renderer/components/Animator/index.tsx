import React from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";

import { useTimer } from "./useTimer";

export enum AnimationTypes {
  translateY = "translateY",
  translateX = "translateX",
  rotate = "rotate",
  scale = "scale",
  skew = "skew",
  opacity = "opacity",
  width = "width",
  height = "height",
}

export type AnimationValue = number;

export interface AnimatorProps {
  animationType: AnimationTypes;
  initialValue: AnimationValue;
  finalValue: AnimationValue;
  animateIn?: boolean;
  duration?: number; // in milliseconds
  animateOutDuration?: number; // milliseconds until it should animate out
  handleAnimationEnd?: () => void;
  children: React.ReactNode;
}

export enum TransitionState {
  unmounted = "unmounted",
  entering = "entering",
  entered = "entered",
  exiting = "exiting",
  exited = "exited",
}

interface StyledAnimatorProps {
  state: TransitionState;
  animationType: AnimationTypes;
  initialValue: AnimationValue;
  finalValue: AnimationValue;
  duration: number;
}

const degreeTypes = [AnimationTypes.rotate, AnimationTypes.skew];

const pixelTypes = [
  AnimationTypes.translateX,
  AnimationTypes.translateY,
  AnimationTypes.width,
  AnimationTypes.height,
];

export const getCSSUnit = (animationType: AnimationTypes) => {
  if (degreeTypes.includes(animationType)) {
    return "deg";
  }

  if (pixelTypes.includes(animationType)) {
    return "px";
  }

  return "";
};

export const getAnimationValue = (
  state: TransitionState,
  initialValue: AnimationValue,
  finalValue: AnimationValue,
): AnimationValue | string => {
  return state === TransitionState.entered || state === TransitionState.entering
    ? finalValue
    : initialValue;
};

const transforms = [
  AnimationTypes.translateY,
  AnimationTypes.translateX,
  AnimationTypes.rotate,
  AnimationTypes.scale,
  AnimationTypes.skew,
];

export const getAnimationCSS = (
  state: TransitionState,
  animationType: AnimationTypes,
  initialValue: AnimationValue,
  finalValue: AnimationValue,
) => {
  const animationValue = getAnimationValue(state, initialValue, finalValue);
  if (transforms.includes(animationType)) {
    return `transform: ${animationType}(${animationValue}${getCSSUnit(
      animationType,
    )})`;
  }

  return `${animationType}: ${animationValue}${getCSSUnit(animationType)}`;
};

export const StyledAnimator = styled.div<StyledAnimatorProps>`
  transition: ${({ duration }) => duration / 1000}s;
  overflow: hidden;
  ${({ state, animationType, initialValue, finalValue }) =>
    getAnimationCSS(state, animationType, initialValue, finalValue)}
`;

export const Animator = ({
  animationType,
  initialValue = 0,
  finalValue = 0,
  animateIn,
  duration = 500,
  animateOutDuration,
  handleAnimationEnd,
  children,
}: AnimatorProps) => {
  /*
   * Transition doesn't animate on mount
   * Apparently adding the `appear` prop should do that, but it doesn't in this case
   * Delaying the component from mounting fixes that.
   * NOTE: This adds a 50ms delay
   */
  const [isMountedDelay, setIsMountedDelay] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsMountedDelay(true);
    }, 50);
  }, []);

  /*
   * Handle auto animate out
   */
  const [shouldAnimateIn, setShouldAnimateIn] = React.useState(false);

  React.useEffect(() => {
    setShouldAnimateIn(animateIn ?? false);
  }, [animateIn]);

  const onAnimateOutDurationEnd = React.useCallback(() => {
    setShouldAnimateIn(false);

    if (handleAnimationEnd) {
      setTimeout(() => {
        handleAnimationEnd();
      }, duration);
    }
  }, [handleAnimationEnd, duration]);

  useTimer({
    duration: animateOutDuration ?? 0,
    onDurationEnd: onAnimateOutDurationEnd,
  });

  return (
    <Transition
      in={isMountedDelay && shouldAnimateIn}
      duration={duration}
      timeout={0}>
      {(state: TransitionState) => {
        return (
          <StyledAnimator
            state={state}
            animationType={animationType}
            initialValue={initialValue}
            finalValue={finalValue}
            duration={duration}>
            {children}
          </StyledAnimator>
        );
      }}
    </Transition>
  );
};
