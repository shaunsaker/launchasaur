import { magicNumber, rhythm } from "../../../theme";

interface MakeSvgArcProps {
  diameter: number;
  innerDiameter: number;
  itemCount: number;
  index: number;
}

export const makeSvgArcProps = ({
  diameter,
  innerDiameter,
  itemCount,
  index,
}: MakeSvgArcProps) => {
  const sectionDegrees = 360 / itemCount;
  const startAngle = index * sectionDegrees;
  const endAngle = startAngle + sectionDegrees;
  const innerRadius = innerDiameter / 2 + rhythm / 2;
  const outerRadius = diameter / 2 - rhythm * 2;
  const cornerRadius = rhythm;
  const padAngle = magicNumber * 4;

  return {
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    cornerRadius,
    padAngle,
  };
};
