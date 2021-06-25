import { firebase } from "..";
import { FirebaseCallableFunctions } from "./models";

export const firebaseStartTrial = async ({
  email,
}: {
  email: string;
}): Promise<void> => {
  return new Promise((resolve, reject) => {
    firebase
      .functions()
      .httpsCallable(FirebaseCallableFunctions.StartTrial)({ email })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
