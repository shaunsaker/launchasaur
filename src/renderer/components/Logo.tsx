import React, { ReactElement } from "react";
import LogoIcon from "../icons/logo.svg";
import { Circle } from "./Circle";
import { ICON_SIZE } from "../theme";

const LOGO_SIZE = ICON_SIZE * 2;

export const Logo = (): ReactElement => {
  return (
    <Circle>
      <img src={LogoIcon} style={{ width: LOGO_SIZE, height: LOGO_SIZE }} />
    </Circle>
  );
};
