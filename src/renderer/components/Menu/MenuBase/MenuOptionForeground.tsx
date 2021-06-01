import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { SVG_BACKGROUND_ID } from ".";

interface MenuOptionForegroundProps {
  index: number;
  svgBackgroundHasMounted: boolean;
  icon: string;
  title: string;
  onHover: (index: number) => void;
}

interface LayoutState {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const MenuOptionForeground = ({
  index,
  svgBackgroundHasMounted,
  icon,
  title,
  onHover,
}: MenuOptionForegroundProps) => {
  const [layout, setLayout] = useState<LayoutState>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // when the svg background has mounted we need to get the corresponding svg group
    // using the index and copy it's layout
    if (svgBackgroundHasMounted) {
      const element = document
        .getElementById(SVG_BACKGROUND_ID)
        .getElementsByTagName("g")
        .item(index);
      const clientRect = element.getClientRects().item(0);

      setLayout(clientRect);
    }
  }, [svgBackgroundHasMounted, index]);

  const onMouseEnter = useCallback(() => {
    onHover(index);
  }, [onHover, index]);

  const onMouseLeave = useCallback(() => {
    onHover(null);
  }, [onHover]);

  return (
    <Container
      layout={layout}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

interface ContainerProps {
  layout: LayoutState;
}

const Container = styled.div<ContainerProps>`
  position: fixed; // we could also calculate the relative positions
  top: ${({ layout }) => layout.top}px;
  left: ${({ layout }) => layout.left}px;
  width: ${({ layout }) => layout.width}px;
  height: ${({ layout }) => layout.height}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
