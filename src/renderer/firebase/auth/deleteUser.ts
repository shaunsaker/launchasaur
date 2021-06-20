import { firebase } from "..";

export const firebaseDeleteUser = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;

    user
      .delete()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
