import React, { ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import { FLEX_CENTER_CSS, RHYTHM } from "../../theme";
import { Button } from "../Button";
import { CircularWindow } from "../CircularWindow";
import { MarginContainer } from "../MarginContainer";
import { Logo } from "../Logo";
import { PageTitleText } from "../PageTitleText";
import { TextInput } from "../TextInput";
import { validateEmail } from "../../utils/validateEmail";
import { validatePassword } from "../../utils/validatePassword";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, login, signup } from "../../store/auth/actions";
import { selectIsAuthLoading, selectUser } from "../../store/auth/selectors";

interface LoginProps {
  title?: string;
}

export const Login = ({ title }: LoginProps): ReactElement => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isAuthLoading = useSelector(selectIsAuthLoading);
  const isForgotPasswordDisabled = !isEmailValid || isAuthLoading;
  const isSubmitDisabled = !isEmailValid || !isPasswordValid || isAuthLoading;
  const showSignupButton = email !== user?.email;

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
    <CircularWindow>
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
            FORGOT PASSWORD?
          </Button>
        </MarginContainer>

        <ButtonsContainer>
          {showSignupButton && (
            <SignUpButtonContainer>
              <Button large disabled={isSubmitDisabled} onClick={onSignupClick}>
                SIGN UP?
              </Button>
            </SignUpButtonContainer>
          )}

          <Button
            large
            primary
            disabled={isSubmitDisabled}
            onClick={onLoginClick}>
            LOG IN
          </Button>
        </ButtonsContainer>
      </Container>
    </CircularWindow>
  );
};

const Container = styled.div`
  ${FLEX_CENTER_CSS};
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

const SignUpButtonContainer = styled.div`
  margin-right: ${RHYTHM}px;
`;
