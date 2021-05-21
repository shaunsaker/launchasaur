export interface EditLinkModalState {
  isShown: boolean;
  menuId: string;
  menuOptionId: string;
  actionId?: string; // if not supplied, we are adding a new link action
}
