export enum Plans {
  Basic = "basic",
  Pro = "pro",
}

export interface UserData {
  plan: Plans;
}

export interface UserState {
  data: UserData;
}
