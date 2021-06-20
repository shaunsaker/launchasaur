import { firebase } from "..";

export const hasFirebaseSession = (): firebase.User | undefined => {
  return firebase.auth().currentUser;
};
