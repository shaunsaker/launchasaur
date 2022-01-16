import { animated, useChain, useSpring, useSpringRef } from "@react-spring/web";
import React, { ReactElement } from "react";
import { ANIMATION_DURATION_MS, theme } from "../../../../theme";

interface LauncherAnimatorProps {
  order: number;
  colour: string;
  children: ReactElement;
}

export const LauncherAnimator = ({
  order,
  colour,
  children,
}: LauncherAnimatorProps): ReactElement => {
  const mountAnimationRef = useSpringRef();
  const mountAnimatedStyle = useSpring({
    to: { opacity: 1, scale: 1 },
    from: { opacity: 0, scale: 0 },
    delay: (order * ANIMATION_DURATION_MS) / 4,
    ref: mountAnimationRef,
  });

  const borderColorAnimationRef = useSpringRef();
  const borderColorAnimatedStyle = useSpring({
    to: { borderColor: colour },
    from: { borderColor: theme.black },
    delay: (order * ANIMATION_DURATION_MS) / 4,
    ref: borderColorAnimationRef,
  });

  useChain([mountAnimationRef, borderColorAnimationRef]);

  return (
    <animated.div
      style={{ ...mountAnimatedStyle, ...borderColorAnimatedStyle }}>
      {children}
    </animated.div>
  );
};
