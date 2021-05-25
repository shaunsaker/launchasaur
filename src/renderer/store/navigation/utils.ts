export const isSubmenuRoute = (): boolean =>
  window.location.hash.includes("menu");

export const getMenuIdFromRoute = (): string | undefined => {
  if (window.location.hash.includes("menu")) {
    return window.location.hash.replace("#/menu/", "");
  }

  return undefined;
};
