import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { SVG_BACKGROUND_ID } from ".";
import { flexCenterCSS, rhythm, theme } from "../../../theme";
import { Icon } from "../../Icon";

interface MenuOptionForegroundProps {
  index: number;
  svgBackgroundHasMounted: boolean;
  icon: IconName;
  title: string;
  shortcut: string;
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
  shortcut,
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

  const onMouseOver = useCallback(() => {
    onHover(index);
  }, [onHover, index]);

  const onMouseLeave = useCallback(() => {
    onHover(null);
  }, [onHover]);

  return (
    <Container
      layout={layout}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}>
      <IconContainer>
        <Icon icon={icon} />
      </IconContainer>

      <Text>{title || "What am I?"}</Text>

      {shortcut && <ShortcutText>{shortcut}</ShortcutText>}
    </Container>
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
  cursor: pointer;
  ${flexCenterCSS}
`;

const IconContainer = styled.div`
  margin-bottom: ${rhythm}px;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.white};
`;

const ShortcutText = styled.div`
  font-size: 12px;
  color: ${theme.white};
  margin-top: ${rhythm / 2}px;
`;
