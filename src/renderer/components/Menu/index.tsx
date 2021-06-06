import React, { ReactElement, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { HomeRouteParams } from "../../pages/Home";
import { makeMenuOptionData } from "../../store/menus/data";
import { ADD_ITEM_TITLE } from "../../store/menus/models";
import { selectMenu } from "../../store/menus/selectors";
import { ApplicationState } from "../../store/reducers";
import { absoluteCenterCSS, flexCenterCSS } from "../../theme";
import { objectToArray } from "../../utils/objectToArray";
import { LogoButton } from "./LogoButton";
import { MenuOptionForeground } from "./MenuOptionForeground";
import { MenuOptionSvgBackground } from "./index/MenuOptionSvgBackground";

const MENU_DIAMETER = 640;
const MENU_INNER_DIAMETER = 128;
export const SVG_BACKGROUND_ID = "menu";

export const Menu = (): ReactElement => {
  const { menuId } = useParams<HomeRouteParams>();
  const menu = useSelector((state: ApplicationState) =>
    selectMenu(state, menuId),
  );
  const [svgBackgroundHasMounted, setSvgBackgroundHasMounted] = useState(false);
  const [menuOptionIndexHovered, setMenuOptionIndexHovered] = useState(null);
  const options = [
    ...objectToArray(menu?.options),
    makeMenuOptionData({
      title: ADD_ITEM_TITLE,
      icon: "plus",
      shortcut: "Ctrl + R",
      isEditable: false,
    }),
  ];
  const itemCount = options.length;

  const onMountSvgBackground = useCallback(() => {
    setSvgBackgroundHasMounted(true);
  }, []);

  const onHoverMenuOption = useCallback((index: number) => {
    setMenuOptionIndexHovered(index);
  }, []);

  return (
    <Container>
      <SvgBackgroundContainer id={SVG_BACKGROUND_ID}>
        {options.map((option, index) => (
          <MenuOptionSvgBackground
            key={option.id}
            diameter={MENU_DIAMETER}
            innerDiameter={MENU_INNER_DIAMETER}
            index={index}
            itemCount={itemCount}
            colour={option.colour}
            isHovered={menuOptionIndexHovered === index}
            onMount={onMountSvgBackground}
          />
        ))}
      </SvgBackgroundContainer>

      <ForegroundContainer>
        {options.map((option, index) => (
          <MenuOptionForeground
            key={option.id}
            diameter={MENU_DIAMETER}
            innerDiameter={MENU_INNER_DIAMETER}
            {...option}
            index={index}
            itemCount={itemCount}
            menuId={menu.id}
            svgBackgroundHasMounted={svgBackgroundHasMounted}
            isHovered={menuOptionIndexHovered === index}
            isEditable={option.isEditable}
            onHover={onHoverMenuOption}
          />
        ))}
      </ForegroundContainer>

      <LogoButtonContainer>
        <LogoButton diameter={MENU_INNER_DIAMETER} />
      </LogoButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  flex: 1;
  ${flexCenterCSS}
`;

const SvgBackgroundContainer = styled.svg`
  width: ${MENU_DIAMETER}px;
  height: ${MENU_DIAMETER}px;
`;

const ForegroundContainer = styled.div``;

const LogoButtonContainer = styled.div`
  ${absoluteCenterCSS}
`;
