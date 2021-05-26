import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import FlatList from "flatlist-react";
import { getIconList } from "../../icons";
import { IconName } from "@fortawesome/fontawesome-common-types";

interface IconPickerProps {
  selected: string;
  onSelect: (icon: string) => void;
}

export const IconPicker = ({
  selected,
  onSelect,
}: IconPickerProps): ReactElement => {
  // TODO: render icons in scrollable div
  // TODO: add type ahead search

  const [iconList] = useState(getIconList());
  const [filter, setFilter] = useState("");

  const onIconClick = useCallback(
    (icon: string) => {
      onSelect(icon);
    },
    [onSelect],
  );

  const onChangeFilter = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setFilter(event.currentTarget.value);
    },
    [setFilter],
  );

  const renderIcon = useCallback(
    (icon: IconName) => {
      return (
        <IconContainer
          key={icon}
          active={selected === icon}
          onClick={() => onIconClick(icon)}>
          <StyledIcon icon={icon} />
        </IconContainer>
      );
    },
    [onIconClick, selected],
  );

  return (
    <Container>
      <input value={filter} onChange={onChangeFilter} />

      <IconsContainer>
        <FlatList
          list={iconList}
          renderItem={renderIcon}
          renderOnScroll
          searchTerm={filter}
        />
      </IconsContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 200px;
  height: 200px;
  overflow: auto;
`;

const IconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface IconContainerProps {
  active: boolean;
}

const IconContainer = styled.div<IconContainerProps>`
  width: 30px;
  height: 30px;
  background-color: ${({ active }) => (active ? "red" : "white")};
`;

const StyledIcon = styled(FontAwesomeIcon)``;
