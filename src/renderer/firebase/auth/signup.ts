import { firebase } from "..";

export const firebaseSignup = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<firebase.User> => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
