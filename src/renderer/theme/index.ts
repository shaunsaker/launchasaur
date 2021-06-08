export const MAGIC_NUMBER = 0.167; // nothing special, I just like it

// colours
export const theme = {
  black: "#000000",
  white: "#FFFFFF",
  white50: "rgba(255, 255, 255, 0.50)",
  backgroundDark: "rgba(0, 0, 0, 0.67)",
  backgroundDarkOpaque: "#1E2524",
  backgroundLight: `rgba(255, 255, 255, ${MAGIC_NUMBER})`,
  accent: "#3BAC98",
  accent67: "rgba(59,172,152, 0.67)",
  danger: "#AC3B42",
  danger67: "rgba(172,59,66,0.67)",
};

// constants
export const RHYTHM = 20;
export const BORDER_WIDTH = RHYTHM / 5;
export const SMALL_BORDER_WIDTH = RHYTHM / 10;
export const BORDER_RADIUS = RHYTHM;
export const SMALL_BORDER_RADIUS = BORDER_RADIUS / 2;
export const SCROLLBAR_WIDTH = RHYTHM / 2;
export const ICON_SIZE = RHYTHM;

// css
const SHADOW_CSS = "0px 4px 4px rgba(0, 0, 0, 0.25)";
export const DROP_SHADOW_CSS = `filter: drop-shadow(${SHADOW_CSS});`;
export const BOX_SHADOW_CSS = `box-shadow: ${SHADOW_CSS};`;

export const ANIMATION_DURATION = MAGIC_NUMBER * 1000; // ms

export const TRANSITION_CSS = `${MAGIC_NUMBER}s ease-in-out;`;

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
