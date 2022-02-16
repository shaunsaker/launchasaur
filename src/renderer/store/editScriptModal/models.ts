export interface EditScriptModalState {
  isShown: boolean;
  launchStationId: string;
  launcherId: string;
  actionId?: string; // if not supplied, we are adding a new script action
}
