import firebase from "firebase";

export interface AuthState {
  authenticated: boolean;
  user: firebase.User | undefined;
  loading: boolean;
}
