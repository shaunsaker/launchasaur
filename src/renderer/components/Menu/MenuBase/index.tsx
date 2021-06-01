import React, { ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import { MenuOptionData } from "../../../store/menus/models";
import { absoluteCenterCSS } from "../../../theme";
import { MenuOptionForeground } from "./MenuOptionForeground";
import {
  MenuOptionSvgBackground,
  MENU_INNER_CIRCLE_DIAMETER,
  MENU_SIZE,
} from "./MenuOptionSvgBackground";

export const SVG_BACKGROUND_ID = "menu";

interface MenuBaseProps {
  options: MenuOptionData[];
  render: (diameter: number) => ReactElement; // renders in the center of the menu, e.g. Logo
}

export const MenuBase = ({ options, render }: MenuBaseProps): ReactElement => {
  const [svgBackgroundHasMounted, setSvgBackgroundHasMounted] = useState(false);
  const [menuOptionIndexHovered, setMenuOptionIndexHovered] = useState(null);

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
            index={index}
            itemCount={options.length}
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
            index={index}
            svgBackgroundHasMounted={svgBackgroundHasMounted}
            icon={option.icon}
            title={option.title}
            onHover={onHoverMenuOptionForeground}
          />
        ))}
      </ForegroundContainer>

      <ChildrenContainer>
        {render(MENU_INNER_CIRCLE_DIAMETER)}
      </ChildrenContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SvgBackgroundContainer = styled.svg`
  width: ${MENU_SIZE}px;
  height: ${MENU_SIZE}px;
`;

const ForegroundContainer = styled.div``;

const ChildrenContainer = styled.div`
  ${absoluteCenterCSS}
`;
