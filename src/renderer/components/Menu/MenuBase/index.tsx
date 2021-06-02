import React, { ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import { MenuOptionData } from "../../../store/menus/models";
import { absoluteCenterCSS, flexCenterCSS } from "../../../theme";
import { MenuOptionForeground } from "./MenuOptionForeground";
import { MenuOptionSvgBackground } from "./MenuOptionSvgBackground";

const MENU_DIAMETER = 640;
const MENU_INNER_DIAMETER = 128;
export const SVG_BACKGROUND_ID = "menu";

interface MenuBaseProps {
  options: MenuOptionData[];
  render: (diameter: number) => ReactElement; // renders in the center of the menu, e.g. Logo
}

export const MenuBase = ({ options, render }: MenuBaseProps): ReactElement => {
  const [svgBackgroundHasMounted, setSvgBackgroundHasMounted] = useState(false);
  const [menuOptionIndexHovered, setMenuOptionIndexHovered] = useState(null);
  const itemCount = options.length;

  const onMountSvgBackground = useCallback(() => {
    setSvgBackgroundHasMounted(true);
  }, []);

  const onHoverMenuOptionForeground = useCallback((index: number) => {
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
            index={index}
            itemCount={itemCount}
            svgBackgroundHasMounted={svgBackgroundHasMounted}
            icon={option.icon}
            title={option.title}
            shortcut={option.shortcut}
            onHover={onHoverMenuOptionForeground}
          />
        ))}
      </ForegroundContainer>

      <ChildrenContainer>{render(MENU_INNER_DIAMETER)}</ChildrenContainer>
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

const ChildrenContainer = styled.div`
  ${absoluteCenterCSS}
`;
