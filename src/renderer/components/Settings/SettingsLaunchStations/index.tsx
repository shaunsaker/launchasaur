import React, {
  ReactElement,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectLaunchStations } from "../../../store/launchStations/selectors";
import { SideMenu, SideMenuOption } from "../../SideMenu";
import { Button } from "../../Button";
import { SettingsBase } from "../SettingsBase";
import { defaultLaunchStationId } from "../../../store/launchStations/models";
import { RHYTHM } from "../../../theme";
import { showAddLaunchStationModal } from "../../../store/addLaunchStationModal/actions";

export const SettingsLaunchStations = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStations = useSelector(selectLaunchStations);
  const [selected, setSelected] = useState("");
  const options: SideMenuOption[] = launchStations.map((launchStation) => ({
    id: launchStation.id,
    title: launchStation.title,
    selected: selected === launchStation.id,
  }));

  useLayoutEffect(() => {
    setSelected(defaultLaunchStationId);
  }, []);

  const onLaunchStationClick = useCallback((option: SideMenuOption) => {
    setSelected(option.id);
  }, []);

  const onAddLaunchStationClick = useCallback(() => {
    dispatch(showAddLaunchStationModal());
  }, [dispatch]);

  return (
    <SettingsBase>
      <Container>
        <SideMenu
          title="LAUNCH STATIONS"
          options={options}
          onOptionClick={onLaunchStationClick}>
          <AddButtonContainer>
            <Button primary large onClick={onAddLaunchStationClick}>
              ADD LAUNCH STATION
            </Button>
          </AddButtonContainer>
        </SideMenu>
      </Container>
    </SettingsBase>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
`;

const AddButtonContainer = styled.div`
  margin-top: ${RHYTHM}px;
`;
