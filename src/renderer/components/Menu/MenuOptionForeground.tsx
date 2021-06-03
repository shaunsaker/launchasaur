import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import React, { useCallback, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { useWindowSize } from "use-hooks";
import { SVG_BACKGROUND_ID } from ".";
import { getSvgArcCentroid } from "../../svg/getSvgArcCentroid";
import { flexCenterCSS, rhythm, theme } from "../../theme";
import { Icon } from "../Icon";
import { SmallButton, SMALL_BUTTON_HEIGHT } from "../SmallButton";
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
  isHovered: boolean;
  isEditing: boolean;
  isEditable: boolean;
  onHover: (index: number | null) => void;
  onEdit: (index: number | null) => void;
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
  isHovered,
  isEditing,
  isEditable,
  onHover,
  onEdit,
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

  const onEditClick = useCallback(() => {
    onEdit(index);
  }, [onEdit, index]);

  const onCloseClick = useCallback(() => {
    onEdit(null);
  }, [onEdit]);

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

        {isEditable && (isEditing || isHovered) && (
          <EditButtonsContainer editing={isEditing}>
            {isEditing ? (
              <>
                <SmallButton primary icon="times" onClick={onCloseClick}>
                  CLOSE
                </SmallButton>
              </>
            ) : (
              <SmallButton primary icon="edit" onClick={onEditClick}>
                EDIT
              </SmallButton>
            )}
          </EditButtonsContainer>
        )}
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
  position: relative;
  ${flexCenterCSS}
`;

const IconContainer = styled.div`
  margin-bottom: ${rhythm}px;
  position: relative;
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

interface EditButtonsContainerProps {
  editing: boolean;
}

const EDIT_BUTTON_MARGIN = rhythm;

const EditButtonsContainer = styled.div<EditButtonsContainerProps>`
  position: absolute;
  bottom: -${SMALL_BUTTON_HEIGHT + EDIT_BUTTON_MARGIN}px;
  ${flexCenterCSS}
`;
