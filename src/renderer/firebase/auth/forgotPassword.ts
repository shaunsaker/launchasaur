import { firebase } from "..";

export const firebaseForgotPassword = ({
  email,
}: {
  email: string;
}): Promise<void> => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
