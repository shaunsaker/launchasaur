export interface EditLinkModalState {
  isShown: boolean;
  launchStationId: string;
  launcherId: string;
  actionId?: string; // if not supplied, we are adding a new link action
}
