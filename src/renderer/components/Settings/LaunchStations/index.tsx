import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectLaunchStations } from "../../../store/launchStations/selectors";
import { Button } from "../../Button";
import { SettingsBase } from "../SettingsBase";
import { RHYTHM } from "../../../theme";
import { addLaunchStation } from "../../../store/launchStations/actions";
import { uuid } from "../../../utils/uuid";
import { LaunchStationEditor } from "./LaunchStationEditor";
import {
  SettingsNavigationMenu,
  SettingsNavigationMenuRoute,
} from "../SettingsNavigationMenu";
import { launchStationIdParam, Routes } from "../../../store/navigation/models";
import { navigateToSettingsLaunchStation } from "../../../store/navigation/actions";
import { selectIsUserPro } from "../../../store/user/selectors";
import { showUpgradeModal } from "../../../store/upgradeModal/actions";

export interface LaunchStationsRouteParams {
  launchStationId: string | undefined;
}

export const LaunchStations = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStations = useSelector(selectLaunchStations);
  const routes: SettingsNavigationMenuRoute[] = launchStations.map(
    (launchStation) => ({
      key: launchStation.id,
      title: launchStation.title,
      route: Routes.settingsLaunchStation.replace(
        launchStationIdParam,
        launchStation.id,
      ),
      baseRoute: Routes.settingsLaunchStation.replace(
        launchStationIdParam,
        launchStation.id,
      ),
    }),
  );
  const userIsPro = useSelector(selectIsUserPro);

  const onAddLaunchStationClick = useCallback(() => {
    if (userIsPro) {
      const id = uuid();

      dispatch(addLaunchStation({ id }));

      dispatch(navigateToSettingsLaunchStation({ launchStationId: id }));
    } else {
      dispatch(showUpgradeModal());
    }
  }, [dispatch, userIsPro]);

  return (
    <SettingsBase>
      <Container>
        <SettingsNavigationMenu title="LAUNCH STATIONS" routes={routes}>
          <AddButtonContainer>
            <Button primary large onClick={onAddLaunchStationClick}>
              ADD LAUNCH STATION
            </Button>
          </AddButtonContainer>
        </SettingsNavigationMenu>

        <LaunchStationEditor />
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
