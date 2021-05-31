import * as d3 from "d3";
import { degreesToRadians } from "./degreesToRadians";

interface GetArcStartingCoordsProps {
  startAngle: number;
  endAngle?: number; // otherwise reuse startAngle to give the start/end coords
  radius: number;
}

// TODO: type this
export const getArcCoords = ({
  startAngle,
  endAngle,
  radius,
}: GetArcStartingCoordsProps): any =>
  d3
    .arc()
    .startAngle(degreesToRadians(startAngle))
    .endAngle(degreesToRadians(endAngle || startAngle))
    .innerRadius(radius)
    .outerRadius(radius)
    // @ts-expect-error it exists
    .centroid();
