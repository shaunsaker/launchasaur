import { getArcCoords } from "./getArcCoords";
import { StartAngle } from "./models";

interface MakeSvgLineProps {
  startAngle: StartAngle;
  innerRadius: number;
  outerRadius: number;
}

export const makeSvgArcLine = ({
  startAngle,
  innerRadius,
  outerRadius,
}: MakeSvgLineProps) => {
  const [arcStartX, arcStartY] = getArcCoords({
    startAngle,
    radius: innerRadius,
  });

  const [arcEndX, arcEndY] = getArcCoords({
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
