import React, { ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import { getIconList } from "../../../icons";
import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { TextInput } from "../../TextInput";
import { FieldContainer } from "../../FieldContainer";
import { useScrollMore } from "./useScrollMore";
import { RHYTHM } from "../../../theme";
import {
  IconContainer,
  ICONS_PER_ROW,
  ICON_CONTAINER_SIZE,
} from "./IconContainer";

const ROWS_TO_RENDER = 4;
const ICONS_CONTAINER_SIZE = ICON_CONTAINER_SIZE * ROWS_TO_RENDER;
const INITIAL_AMOUNT_TO_RENDER = ROWS_TO_RENDER * ICONS_PER_ROW * 2;
const SCROLL_MORE_AMOUNT = INITIAL_AMOUNT_TO_RENDER;

interface IconPickerProps {
  selected: string;
  onSelect: (icon: IconName) => void;
}

export const IconPicker = ({
  selected,
  onSelect,
}: IconPickerProps): ReactElement => {
  const [iconList] = useState(getIconList());
  const [filter, setFilter] = useState("");
  const filteredIcons = iconList.filter((icon) =>
    icon.includes(filter.toLowerCase()),
  );
  const { scrollRef, data } = useScrollMore<IconName>({
    data: filteredIcons,
    initialAmount: INITIAL_AMOUNT_TO_RENDER,
    scrollMoreAmount: SCROLL_MORE_AMOUNT,
  });

  const onIconClick = useCallback(
    (icon: IconName) => {
      onSelect(icon);
    },
    [onSelect],
  );

  const onChangeFilter = useCallback(
    (value: string) => {
      setFilter(value);
    },
    [setFilter],
  );

  return (
    <Container>
      <FieldContainer>
        <TextInput
          label="Search for an Icon"
          placeholder="Filter by name..."
          value={filter}
          onChangeText={onChangeFilter}
        />
      </FieldContainer>

      <IconsContainer ref={scrollRef}>
        {data.map((icon) => (
          <IconContainer
            key={icon}
            active={selected === icon}
            icon={icon}
            onClick={() => onIconClick(icon)}
          />
        ))}
      </IconsContainer>
    </Container>
  );
};

const Container = styled.div`
  overflow: auto;
`;

const IconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: ${ICONS_CONTAINER_SIZE}px;
  overflow-y: scroll;
  margin-bottom: ${RHYTHM}px;
`;
