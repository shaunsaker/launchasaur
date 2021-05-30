import * as d3 from "d3";
import { SvgSelector } from "./models";

interface MakeSvgProps {
  selector: SvgSelector;
  size: number;
}

export const makeSvg = ({ selector, size }: MakeSvgProps) => {
  const center = size / 2;
  const svg = d3
    .select(selector)
    .append("g")
    .attr("transform", `translate(${center},${center})`);

  return svg;
};
