import * as d3 from "d3";
import { degreesToRadians } from "./degreesToRadians";
import { EndAngle, StartAngle, Thickness } from "./models";

interface MakeArcSvgProps {
  innerRadius: number;
  outerRadius: Thickness;
  startAngle: StartAngle;
  endAngle: EndAngle;
  cornerRadius?: number;
}

export const makeSvgArcPath = ({
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  cornerRadius,
}: MakeArcSvgProps): string => {
  const startAngleRadians = degreesToRadians(startAngle);
  const endAngleRadians = degreesToRadians(endAngle);

  const arcGenerator = d3.arc().cornerRadius(cornerRadius);
  const path = arcGenerator({
    innerRadius,
    outerRadius,
    startAngle: startAngleRadians,
    endAngle: endAngleRadians,
  });

  return path;
};
