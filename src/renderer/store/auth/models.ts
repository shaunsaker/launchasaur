import firebase from "firebase";

export interface AuthState {
  authenticated: boolean;
  user: firebase.User | undefined;
  isLoginLoading: boolean;
  isSignupLoading: boolean;
  isForgotPasswordLoading: boolean;
  isSignoutLoading: boolean;
  isUpdateEmailLoading: boolean;
  isUpdatePasswordLoading: boolean;
  isDeleteAccountLoading: boolean;
}
