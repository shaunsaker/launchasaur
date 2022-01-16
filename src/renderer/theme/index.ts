export const MAGIC_NUMBER = 0.167; // nothing special, I just like it

// colours
export const theme = {
  black: "#000000",
  white: "#FFFFFF",
  white80: "rgba(255, 255, 255, 0.80)",
  white50: "rgba(255, 255, 255, 0.50)",
  white33: "rgba(255, 255, 255, 0.33)",
  white5: "rgba(255, 255, 255, 0.05)",
  backgroundDark: "rgba(0, 0, 0, 0.67)",
  backgroundDark33: "rgba(0, 0, 0, 0.33)",
  backgroundDarkOpaque: "#1E2524",
  backgroundLight: `rgba(255, 255, 255, ${MAGIC_NUMBER})`,
  backgroundLightOpaque: "#373E3D",
  accent: "#3BAC98",
  accent67: "rgba(59,172,152, 0.67)",
  danger: "#AC3B42",
  danger67: "rgba(172,59,66,0.67)",
};

// constants
export const RHYTHM = 16;
export const BORDER_WIDTH = RHYTHM / 4;
export const SMALL_BORDER_WIDTH = BORDER_WIDTH / 2;
export const BORDER_RADIUS = RHYTHM;
export const SMALL_BORDER_RADIUS = BORDER_RADIUS / 2;
export const SCROLLBAR_WIDTH = RHYTHM / 2;
export const ICON_SIZE = RHYTHM;
export const CONTENT_CONTAINER_WIDTH = 536;
export const LAUNCHER_SIZE = 240;
export const MAX_TEXT_WIDTH = 480;

// css
const SHADOW_CSS = "0px 4px 4px rgba(0, 0, 0, 0.25)";
export const DROP_SHADOW_CSS = `filter: drop-shadow(${SHADOW_CSS});`;
export const BOX_SHADOW_CSS = `box-shadow: ${SHADOW_CSS};`;

export const ANIMATION_DURATION_MS = MAGIC_NUMBER * 1000; // ms

export const ANIMATION_FUNCTION = "ease-out";

export const TRANSITION_CSS = `${MAGIC_NUMBER}s ${ANIMATION_FUNCTION};`;

export const ABSOLUTE_CENTER_CSS = `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ABSOLUTE_STRETCH_CSS = `
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const FLEX_CENTER_CSS = `
  justify-content: center;
  align-items: center;
`;

export const TEXT_ELLIPSIS_CSS = `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
