import React, { ReactElement } from "react";
import styled from "styled-components";
import { MenuOptionData } from "../../../store/menus/models";
import { absoluteCenterCSS } from "../../../theme";
import {
  MenuBaseOption,
  MENU_INNER_CIRCLE_DIAMETER,
  MENU_SIZE,
} from "./MenuBaseOption";

interface MenuBaseProps {
  options: MenuOptionData[];
  render: (diameter: number) => ReactElement; // renders in the center of the menu, e.g. Logo
}

export const MenuBase = ({ options, render }: MenuBaseProps): ReactElement => {
  return (
    <Container>
      <StyledSvg>
        {options.map((option, index) => (
          <MenuBaseOption
            key={option.id}
            index={index}
            itemCount={options.length}
            colour={option.colour}
          />
        ))}
      </StyledSvg>

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

const StyledSvg = styled.svg`
  width: ${MENU_SIZE}px;
  height: ${MENU_SIZE}px;
`;

const ChildrenContainer = styled.div`
  ${absoluteCenterCSS}
`;
