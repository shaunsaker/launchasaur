import * as d3 from "d3";
import { degreesToRadians } from "./degreesToRadians";

interface GetSvgArcCentroidProps {
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  cornerRadius: number;
  padAngle: number;
}

export const getSvgArcCentroid = ({
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  padAngle,
}: GetSvgArcCentroidProps) => {
  const startAngleRadians = degreesToRadians(startAngle);
  const endAngleRadians = degreesToRadians(endAngle);
  const padAngleRadians = degreesToRadians(padAngle);

  const centroid = d3.arc().centroid({
    innerRadius,
    outerRadius,
    startAngle: startAngleRadians,
    endAngle: endAngleRadians,
    padAngle: padAngleRadians,
  });

  return centroid;
};
