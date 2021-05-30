// TODO: type svg type correctly
export const appendPathToSvg = (
  svg: any,
  path: SVGPathElement,
  className: string,
) => {
  return svg.append("path").attr("d", path).attr("class", className);
};
