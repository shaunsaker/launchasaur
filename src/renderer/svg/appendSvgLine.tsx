import { Thickness } from "./models";

interface MakeSvgLineProps {
  svg: any;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  thickness: Thickness;
}

// TODO: type return type correctly
export const appendSvgLine = ({
  svg,
  x1,
  y1,
  x2,
  y2,
  color,
  thickness,
}: MakeSvgLineProps): any => {
  return svg
    .append("line")
    .attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2)
    .style("stroke", color)
    .style("stroke-width", thickness);
};
