import * as d3 from "d3";
import { degreesToRadians } from "./degreesToRadians";

interface MakeArcSvgProps {
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  cornerRadius: number;
  padAngle: number;
}

export const makeSvgArcPath = ({
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  cornerRadius,
  padAngle,
}: MakeArcSvgProps): string => {
  const startAngleRadians = degreesToRadians(startAngle);
  const endAngleRadians = degreesToRadians(endAngle);
  const padAngleRadians = degreesToRadians(padAngle);

  const arcGenerator = d3.arc().cornerRadius(cornerRadius);
  const path = arcGenerator({
    innerRadius,
    outerRadius,
    startAngle: startAngleRadians,
    endAngle: endAngleRadians,
    padAngle: padAngleRadians,
  });

  return path;
};
