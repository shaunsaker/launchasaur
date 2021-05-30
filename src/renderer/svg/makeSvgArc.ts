import * as d3 from "d3";
import { degreesToRadians } from "./degreesToRadians";
import { EndAngle, StartAngle, Thickness } from "./models";

interface MakeArcSvgProps {
  innerRadius: number;
  thickness: Thickness;
  startAngle: StartAngle;
  endAngle: EndAngle;
  cornerRadius?: number;
}

// TODO: type return type correctly
export const makeSvgArc = ({
  innerRadius,
  thickness,
  startAngle,
  endAngle,
  cornerRadius,
}: MakeArcSvgProps) => {
  const outerRadius = innerRadius + thickness;
  const startAngleRadians = degreesToRadians(startAngle);
  const endAngleRadians = degreesToRadians(endAngle);
  const arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(startAngleRadians)
    .endAngle(endAngleRadians);

  if (cornerRadius) {
    arc.cornerRadius(cornerRadius);
  }

  return arc;
};
