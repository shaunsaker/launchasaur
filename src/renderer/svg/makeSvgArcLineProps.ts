import * as d3 from "d3";
import { degreesToRadians } from "./degreesToRadians";
import { StartAngle } from "./models";

interface GetArcStartingCoordsProps {
  startAngle: StartAngle;
  radius: number;
}

// TODO: type this
const getArcStartingCoords = ({
  startAngle,
  radius,
}: GetArcStartingCoordsProps): any =>
  d3
    .arc()
    .startAngle(degreesToRadians(startAngle))
    .endAngle(degreesToRadians(startAngle))
    .innerRadius(radius)
    .outerRadius(radius)
    // @ts-expect-error it exists
    .centroid();

interface MakeSvgLineProps {
  startAngle: StartAngle;
  innerRadius: number;
  outerRadius: number;
}

interface SvgLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const makeSvgArcLineProps = ({
  startAngle,
  innerRadius,
  outerRadius,
}: MakeSvgLineProps): SvgLineProps => {
  const [arcStartX, arcStartY] = getArcStartingCoords({
    startAngle,
    radius: innerRadius,
  });

  const [arcEndX, arcEndY] = getArcStartingCoords({
    startAngle,
    radius: outerRadius,
  });

  return {
    x1: arcStartX,
    y1: arcStartY,
    x2: arcEndX,
    y2: arcEndY,
  };
};
