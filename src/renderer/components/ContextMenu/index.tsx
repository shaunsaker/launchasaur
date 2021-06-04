import React from "react";
import styled from "styled-components";
import { useContextMenu } from "./useContextMenu";

interface ContextMenuProps {}

export const ContextMenu = ({}: ContextMenuProps) => {
  const { xPos, yPos, showMenu } = useContextMenu();

  if (!showMenu) {
    return null;
  }

  return <ContextMenuContainer />;
};

const ContextMenuContainer = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;
