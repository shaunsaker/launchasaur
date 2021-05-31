const MAGIC_NUMBER = 0.167; // nothing special, I just like it

export const theme = {
  black: "#000000",
  backgroundDark: "rgba(0, 0, 0, 0.67)",
  backgroundLight: `rgba(255, 255, 255, ${MAGIC_NUMBER})`,
  accent: "#3BAC98",
};

const shadowCSS = "0px 4px 4px rgba(0, 0, 0, 0.25)";
export const dropShadowCSS = `filter: drop-shadow(${shadowCSS});`;
export const boxShadowCSS = `box-shadow: ${shadowCSS};`;

export const transitionCSS = `${MAGIC_NUMBER}s ease-in-out;`;

export const borderWidth = 2;

export const rhythm = 16;
