import React from "react";
import styled from "styled-components";
import { LaunchStationData } from "../../../store/launchStations/models";
import { theme } from "../../../theme";

interface LaunchStationEditorProps {
  launchStation: LaunchStationData;
}

export const LaunchStationEditor = ({
  launchStation,
}: LaunchStationEditorProps) => {
  return (
    <LaunchStationEditorContainer>
      <TitleText>{launchStation.title} Launch Station</TitleText>
    </LaunchStationEditorContainer>
  );
};

const LaunchStationEditorContainer = styled.div``;

const TitleText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.white};
`;
