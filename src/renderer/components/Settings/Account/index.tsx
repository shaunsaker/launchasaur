import React, { ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  deleteAccount,
  updateEmail,
  updatePassword,
} from "../../../store/auth/actions";
import { selectUser } from "../../../store/auth/selectors";
import { showConfirmationModal } from "../../../store/confirmationModal/actions";
import { validateEmail } from "../../../utils/validateEmail";
import { validatePassword } from "../../../utils/validatePassword";
import { Button } from "../../Button";
import { MarginContainer } from "../../MarginContainer";
import { PageContentContainer } from "../../PageContentContainer";
import { PageTitleText } from "../../PageTitleText";
import { TextInput } from "../../TextInput";
import { SettingsBase } from "../SettingsBase";

export const Account = (): ReactElement => {
  // TODO: reauthenticate before any of these actions
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [email, setEmail] = useState(user.email);
  const isEmailValid = validateEmail(email);
  const hasEmailChanged = email !== user.email;
  const isChangeEmailButtonDisabled = !hasEmailChanged || !isEmailValid;
  const [password, setPassword] = useState("");
  const isPasswordValid = validatePassword(password);
  const isChangePasswordButtonDisabled = !isPasswordValid;

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangeEmailClick = useCallback(() => {
    dispatch(updateEmail.request({ email }));
  }, [dispatch, email]);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onChangePasswordClick = useCallback(() => {
    dispatch(updatePassword.request({ password }));
  }, [dispatch, password]);

  const onDeleteAccountClick = useCallback(() => {
    dispatch(
      showConfirmationModal({
        title: "Are you sure you want to delete your account?",
        subtitle: "This action cannot be undone.",
        actions: [deleteAccount.request()],
      }),
    );
  }, [dispatch]);

  return (
    <SettingsBase>
      <Container>
        <PageContentContainer>
          <PageTitleText>My Account</PageTitleText>

          <MarginContainer small>
            <TextInput
              label="Email"
              placeholder="Change your email..."
              value={email}
              onChangeText={onChangeEmail}
            />
          </MarginContainer>

          <MarginContainer>
            <ButtonContainer>
              <Button
                disabled={isChangeEmailButtonDisabled}
                onClick={onChangeEmailClick}>
                CHANGE YOUR EMAIL
              </Button>
            </ButtonContainer>
          </MarginContainer>

          <MarginContainer small>
            <TextInput
              type="password"
              label="Password"
              placeholder="Change your password..."
              value={password}
              onChangeText={onChangePassword}
            />
          </MarginContainer>

          <MarginContainer>
            <ButtonContainer>
              <Button
                disabled={isChangePasswordButtonDisabled}
                onClick={onChangePasswordClick}>
                CHANGE YOUR PASSWORD
              </Button>
            </ButtonContainer>
          </MarginContainer>

          <DeleteButtonContainer>
            <Button danger large onClick={onDeleteAccountClick}>
              DELETE YOUR ACCOUNT
            </Button>
          </DeleteButtonContainer>
        </PageContentContainer>
      </Container>
    </SettingsBase>
  );
};

const Container = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
