import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useWindowSize } from "use-hooks";
import {
  addLauncher,
  triggerLauncher,
} from "../../store/launchStations/actions";
import {
  ADD_ITEM_TITLE,
  LaunchStationId,
  LauncherData,
} from "../../store/launchStations/models";
import { getSvgArcCentroid } from "../../svg/getSvgArcCentroid";
import { FLEX_CENTER_CSS, RHYTHM, theme } from "../../theme";
import { uuid } from "../../utils/uuid";
import { ContextMenu } from "./ContextMenu";
import { Icon } from "../Icon";
import { makeSvgArcProps } from "./LauncherSvgBackground/makeSvgArcProps";

interface LauncherForegroundProps extends LauncherData {
  diameter: number;
  innerDiameter: number;
  index: number;
  itemCount: number;
  launchStationId: LaunchStationId;
  svgBackgroundHasMounted: boolean;
  isHovered: boolean;
  isEditable: boolean;
  onHover: (index: number | null) => void;
}

interface LayoutState {
  top: number;
  left: number;
  width: number;
  height: number;
  contentTranslateX: number;
  contentTranslateY: number;
}

export const LauncherForeground = ({
  diameter,
  innerDiameter,
  index,
  itemCount,
  launchStationId,
  svgBackgroundHasMounted,
  id,
  icon,
  title,
  shortcut,
  isHovered,
  isEditable,
  onHover,
}: LauncherForegroundProps) => {
  const dispatch = useDispatch();
  const [layout, setLayout] = useState<LayoutState>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    contentTranslateX: 0,
    contentTranslateY: 0,
  });
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  useLayoutEffect(() => {
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
        (diameter / 2 - RHYTHM * 2 + innerDiameter / 2 + RHYTHM / 2) / 2;
      const arcCentroid = getSvgArcCentroid({
        ...svgArcProps,
        innerRadius: centerRadius,
        outerRadius: centerRadius,
      });
      const element = document
        .getElementById(launchStationId)
        .getElementsByTagName("g")
        .item(index)
        .getElementsByTagName("path")
        .item(1);
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
    launchStationId,
  ]);

  const onMouseOver = useCallback(() => {
    onHover(index);
  }, [onHover, index]);

  const onMouseLeave = useCallback(() => {
    onHover(null);
  }, [onHover]);

  const onClick = useCallback(() => {
    const isAddItem = title === ADD_ITEM_TITLE;

    if (isAddItem) {
      dispatch(addLauncher({ launchStationId, launcherId: uuid() }));
    } else {
      dispatch(
        triggerLauncher.request({
          launchStationId: launchStationId,
          launcherId: id,
        }),
      );
    }
  }, [dispatch, launchStationId, id, title]);

  if (!svgBackgroundHasMounted) {
    return null;
  }

  return (
    <Container
      layout={layout}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={onClick}>
      <ContentContainer
        translateX={layout.contentTranslateX}
        translateY={layout.contentTranslateY}>
        <IconContainer>
          <Icon icon={icon} />
        </IconContainer>

        <Text>{title}</Text>

        <ShortcutText>{shortcut || ""}</ShortcutText>
      </ContentContainer>

      {isEditable && isHovered && (
        <ContextMenu launchStationId={launchStationId} launcherId={id} />
      )}
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
  ${FLEX_CENTER_CSS}
`;

interface ContentContainerProps {
  translateX: number;
  translateY: number;
}

const ContentContainer = styled.div<ContentContainerProps>`
  transform: ${({ translateX, translateY }) =>
    `translate(${translateX}px, ${translateY}px)`};
  position: relative;
  ${FLEX_CENTER_CSS}
`;

const IconContainer = styled.div`
  margin-bottom: ${RHYTHM}px;
  position: relative;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.white};
`;

const SHORTCUT_TEXT_SIZE = 12;
const ShortcutText = styled.div`
  font-size: ${SHORTCUT_TEXT_SIZE}px;
  height: ${SHORTCUT_TEXT_SIZE}px; // allows us to have empty text with the same layout
  color: ${theme.white};
  margin-top: ${RHYTHM / 2}px;
`;
