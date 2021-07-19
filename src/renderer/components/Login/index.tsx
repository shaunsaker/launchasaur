import React, { ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import { FLEX_CENTER_CSS, RHYTHM } from "../../theme";
import { Button } from "../Button";
import { WindowContainer } from "../WindowContainer";
import { MarginContainer } from "../MarginContainer";
import { Logo } from "../Logo";
import { PageTitleText } from "../PageTitleText";
import { TextInput } from "../TextInput";
import { validateEmail } from "../../utils/validateEmail";
import { validatePassword } from "../../utils/validatePassword";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, login, signup } from "../../store/auth/actions";
import {
  selectIsForgotPasswordLoading,
  selectIsLoginLoading,
  selectIsSignupLoading,
  selectUserEmail,
} from "../../store/auth/selectors";

interface LoginProps {
  title?: string;
}

export const Login = ({ title }: LoginProps): ReactElement => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  const [email, setEmail] = useState(userEmail || "");
  const [password, setPassword] = useState("");
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isForgotPasswordLoading = useSelector(selectIsForgotPasswordLoading);
  const isForgotPasswordDisabled = !isEmailValid || isForgotPasswordLoading;
  const isLoginLoading = useSelector(selectIsLoginLoading);
  const isSignupLoading = useSelector(selectIsSignupLoading);
  const isSubmitDisabled =
    !isEmailValid || !isPasswordValid || isLoginLoading || isSignupLoading;

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onForgotPasswordClick = useCallback(() => {
    dispatch(forgotPassword.request({ email }));
  }, [dispatch, email]);

  const onSignupClick = useCallback(() => {
    dispatch(signup.request({ email, password }));
  }, [dispatch, email, password]);

  const onLoginClick = useCallback(() => {
    dispatch(login.request({ email, password }));
  }, [dispatch, email, password]);

  return (
    <WindowContainer>
      <Container>
        <MarginContainer small>
          <Logo />
        </MarginContainer>

        <PageTitleText>{title || "Login to Launchasaur"}</PageTitleText>

        <MarginContainer small>
          <TextInput
            autoFocus
            label="Email"
            placeholder="Enter your email..."
            value={email}
            onChangeText={onChangeEmail}
          />
        </MarginContainer>

        <MarginContainer small>
          <TextInput
            type="password"
            label="Password"
            placeholder="Enter your password..."
            value={password}
            onChangeText={onChangePassword}
          />
        </MarginContainer>

        <MarginContainer>
          <Button
            disabled={isForgotPasswordDisabled}
            onClick={onForgotPasswordClick}>
            {isForgotPasswordLoading
              ? "SENDING PASSWORD RESET EMAIL..."
              : "RESET PASSWORD"}
          </Button>
        </MarginContainer>

        <ButtonsContainer>
          <SignUpButtonContainer>
            <Button large disabled={isSubmitDisabled} onClick={onSignupClick}>
              {isSignupLoading ? "SIGNING YOU UP..." : "SIGN UP"}
            </Button>
          </SignUpButtonContainer>

          <Button
            large
            primary
            disabled={isSubmitDisabled}
            onClick={onLoginClick}>
            {isLoginLoading ? "LOGGING YOU IN..." : "LOG IN"}
          </Button>
        </ButtonsContainer>
      </Container>
    </WindowContainer>
  );
};

const Container = styled.div`
  ${FLEX_CENTER_CSS};
`;

const ButtonsContainer = styled.div`
  flex-direction: row;
`;

const SignUpButtonContainer = styled.div`
  margin-right: ${RHYTHM}px;
`;
