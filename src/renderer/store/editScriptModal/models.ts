export interface EditScriptModalState {
  isShown: boolean;
  menuId: string;
  menuOptionId: string;
  actionId?: string; // if not supplied, we are adding a new script action
}
