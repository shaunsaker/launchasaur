import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useWindowSize } from "use-hooks";
import { SVG_BACKGROUND_ID } from ".";
import { getSvgArcCentroid } from "../../../svg/getSvgArcCentroid";
import { flexCenterCSS, rhythm, theme } from "../../../theme";
import { Icon } from "../../Icon";
import { makeSvgArcProps } from "./makeSvgArcProps";

interface MenuOptionForegroundProps {
  diameter: number;
  innerDiameter: number;
  index: number;
  itemCount: number;
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
  contentTranslateX: number;
  contentTranslateY: number;
}

export const MenuOptionForeground = ({
  diameter,
  innerDiameter,
  index,
  itemCount,

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
    contentTranslateX: 0,
    contentTranslateY: 0,
  });
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  useEffect(() => {
    // when the svg background has mounted we need to get the corresponding svg group
    // using the index and copy it's layout
    // we also position the inner content container so that it's center point
    // is exactly between the inner and outer arcs
    if (svgBackgroundHasMounted) {
      const svgArcProps = makeSvgArcProps({
        diameter,
        innerDiameter,
        itemCount,
        index,
      });
      const centerRadius =
        (diameter / 2 - rhythm * 2 + innerDiameter / 2 + rhythm / 2) / 2;
      const arcCentroid = getSvgArcCentroid({
        ...svgArcProps,
        innerRadius: centerRadius,
        outerRadius: centerRadius,
      });
      const element = document
        .getElementById(SVG_BACKGROUND_ID)
        .getElementsByTagName("g")
        .item(index)
        .getElementsByTagName("path")
        .item(0);
      const clientRect = element.getClientRects().item(0);
      const centerCoordsOfContainerRelativeToWindow = [
        clientRect.x + clientRect.width / 2,
        clientRect.y + clientRect.height / 2,
      ];
      const centerCoordsOfWindow = [windowWidth / 2, windowHeight / 2];
      const arcCentroidRelativeToWindow = [
        arcCentroid[0] + centerCoordsOfWindow[0],
        arcCentroid[1] + centerCoordsOfWindow[1],
      ];
      const contentTranslateRequired = [
        arcCentroidRelativeToWindow[0] -
          centerCoordsOfContainerRelativeToWindow[0],
        arcCentroidRelativeToWindow[1] -
          centerCoordsOfContainerRelativeToWindow[1],
      ];

      setLayout({
        top: clientRect.top,
        left: clientRect.left,
        width: clientRect.width,
        height: clientRect.height,
        contentTranslateX: contentTranslateRequired[0],
        contentTranslateY: contentTranslateRequired[1],
      });
    }
  }, [
    svgBackgroundHasMounted,
    diameter,
    innerDiameter,
    index,
    itemCount,
    windowWidth,
    windowHeight,
  ]);

  const onMouseOver = useCallback(() => {
    onHover(index);
  }, [onHover, index]);

  const onMouseLeave = useCallback(() => {
    onHover(null);
  }, [onHover]);

  if (!svgBackgroundHasMounted) {
    return null;
  }

  return (
    <Container
      layout={layout}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}>
      <ContentContainer
        translateX={layout.contentTranslateX}
        translateY={layout.contentTranslateY}>
        <IconContainer>
          <Icon icon={icon} />
        </IconContainer>

        <Text>{title || "What am I?"}</Text>

        {shortcut && <ShortcutText>{shortcut}</ShortcutText>}
      </ContentContainer>
    </Container>
  );
};

interface ContainerProps {
  layout: LayoutState;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  top: ${({ layout }) => layout.top}px;
  left: ${({ layout }) => layout.left}px;
  width: ${({ layout }) => layout.width}px;
  height: ${({ layout }) => layout.height}px;
  cursor: pointer;
  ${flexCenterCSS}
`;

interface ContentContainerProps {
  translateX: number;
  translateY: number;
}

const ContentContainer = styled.div<ContentContainerProps>`
  transform: ${({ translateX, translateY }) =>
    `translate(${translateX}px, ${translateY}px)`};
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
