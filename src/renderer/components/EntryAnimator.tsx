import { animated, useSpring } from "@react-spring/web";
import React, { ReactElement } from "react";

interface EntryAnimatorProps {
  children: ReactElement;
}

export const EntryAnimator = ({
  children,
}: EntryAnimatorProps): ReactElement => {
  const mountAnimatedStyle = useSpring({
    to: { opacity: 1, scale: 1 },
    from: { opacity: 0, scale: 0 },
  });

  return (
    <animated.div style={{ ...mountAnimatedStyle }}>{children}</animated.div>
  );
};
