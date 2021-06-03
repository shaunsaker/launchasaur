export const magicNumber = 0.167; // nothing special, I just like it

// colours
export const theme = {
  black: "#000000",
  white: "#FFFFFF",
  backgroundDark: "rgba(0, 0, 0, 0.67)",
  backgroundLight: `rgba(255, 255, 255, ${magicNumber})`,
  accent: "#3BAC98",
};

// constants
export const borderWidth = 3;
export const smallBorderWidth = 2;

export const rhythm = 16;

export const borderRadius = rhythm;

// css
const shadowCSS = "0px 4px 4px rgba(0, 0, 0, 0.25)";
export const dropShadowCSS = `filter: drop-shadow(${shadowCSS});`;
export const boxShadowCSS = `box-shadow: ${shadowCSS};`;

export const transitionCSS = `${magicNumber}s ease-in-out;`;

export const absoluteCenterCSS = `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const absoluteStretchCSS = `
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const flexCenterCSS = `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
