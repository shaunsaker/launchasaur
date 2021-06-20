import { firebase } from "..";

export const firebaseUpdatePassword = ({
  password,
}: {
  password: string;
}): Promise<void> => {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;

    user
      .updatePassword(password)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
