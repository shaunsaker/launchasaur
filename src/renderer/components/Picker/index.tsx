import React, { ReactElement } from "react";
import styled from "styled-components";
import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { useScrollMore } from "./useScrollMore";
import { RHYTHM } from "../../theme";
import {
  ItemContainer,
  ITEMS_PER_ROW,
  PICKER_ITEM_CONTAINER_SIZE,
} from "./ItemContainer";

interface PickerProps<T> {
  data: T[];
  selected: T;
  rowsToRender: number;
  renderItem: (item: T) => ReactElement;
  onSelect: (icon: IconName) => void;
}

export const Picker = ({
  data,
  selected,
  rowsToRender,
  renderItem,
  onSelect,
}: PickerProps<any>): ReactElement => {
  // TODO: when two rows, they fill the space
  const CONTAINER_SIZE = PICKER_ITEM_CONTAINER_SIZE * rowsToRender;
  const INITIAL_AMOUNT_TO_RENDER = rowsToRender * ITEMS_PER_ROW * 2;
  const SCROLL_MORE_AMOUNT = INITIAL_AMOUNT_TO_RENDER;

  const { scrollRef, dataToRender } = useScrollMore<IconName>({
    data,
    initialAmount: INITIAL_AMOUNT_TO_RENDER,
    scrollMoreAmount: SCROLL_MORE_AMOUNT,
  });

  return (
    <Container ref={scrollRef} height={CONTAINER_SIZE}>
      {dataToRender.map((item) => (
        <ItemContainer
          key={item}
          active={selected === item}
          onClick={() => onSelect(item)}>
          {renderItem(item)}
        </ItemContainer>
      ))}
    </Container>
  );
};

interface ContainerProps {
  height: number;
}

const Container = styled.div<ContainerProps>`
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  height: ${({ height }) => height}px;
  overflow-y: scroll;
  margin-bottom: ${RHYTHM}px;
`;
