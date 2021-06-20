import { firebase } from "..";

export const firebaseUpdateEmail = ({
  email,
}: {
  email: string;
}): Promise<void> => {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;

    user
      .updateEmail(email)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
