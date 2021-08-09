import React, { ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hasFirebaseSession } from "../../../../firebase/auth/session";
import {
  deleteAccount,
  updateEmail,
  updatePassword,
} from "../../../../store/auth/actions";
import {
  selectIsDeleteAccountLoading,
  selectIsUpdateEmailLoading,
  selectIsUpdatePasswordLoading,
  selectUserEmail,
} from "../../../../store/auth/selectors";
import { showConfirmationModal } from "../../../../store/confirmationModal/actions";
import { showLoginModal } from "../../../../store/loginModal/actions";
import { validateEmail } from "../../../../utils/validateEmail";
import { validatePassword } from "../../../../utils/validatePassword";
import { Button } from "../../../Button";
import { MarginContainer } from "../../../MarginContainer";
import { PageContentContainer } from "../../../PageContentContainer";
import { TitleText } from "../../../TitleText";
import { TextInput } from "../../../TextInput";
import { SettingsBase } from "../../SettingsBase";
import { AccountBase } from "../AccountBase";

export const AccountInfo = (): ReactElement => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  const [email, setEmail] = useState(userEmail);
  const isEmailValid = validateEmail(email);
  const hasEmailChanged = email !== userEmail;
  const [password, setPassword] = useState("");
  const isPasswordValid = validatePassword(password);
  const isUpdateEmailLoading = useSelector(selectIsUpdateEmailLoading);
  const isUpdatePasswordLoading = useSelector(selectIsUpdatePasswordLoading);
  const isDeleteAccountLoading = useSelector(selectIsDeleteAccountLoading);
  const isChangeEmailButtonDisabled =
    !hasEmailChanged || !isEmailValid || isUpdateEmailLoading;
  const isChangePasswordButtonDisabled =
    !isPasswordValid || isUpdatePasswordLoading;
  const isDeleteAccountButtonDisabled = isDeleteAccountLoading;

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangeEmailClick = useCallback(() => {
    if (hasFirebaseSession()) {
      dispatch(updateEmail.request({ email }));
    } else {
      dispatch(showLoginModal());
    }
  }, [dispatch, email]);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onChangePasswordClick = useCallback(() => {
    if (hasFirebaseSession()) {
      dispatch(updatePassword.request({ password }));
    } else {
      dispatch(showLoginModal());
    }
  }, [dispatch, password]);

  const onDeleteAccountClick = useCallback(() => {
    if (hasFirebaseSession()) {
      dispatch(
        showConfirmationModal({
          title: "Are you sure you want to delete your account?",
          subtitle: "This action cannot be undone.",
          actions: [deleteAccount.request()],
        }),
      );
    } else {
      dispatch(showLoginModal());
    }
  }, [dispatch]);

  return (
    <SettingsBase>
      <AccountBase>
        <Container>
          <PageContentContainer>
            <MarginContainer>
              <TitleText>My Account</TitleText>
            </MarginContainer>

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
                  {isUpdateEmailLoading
                    ? "CHANGING YOUR EMAIL..."
                    : "CHANGE YOUR EMAIL"}
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
                  {isUpdatePasswordLoading
                    ? "CHANGING YOUR PASSWORD..."
                    : "CHANGE YOUR PASSWORD"}
                </Button>
              </ButtonContainer>
            </MarginContainer>

            <DeleteButtonContainer>
              <Button
                danger
                large
                disabled={isDeleteAccountButtonDisabled}
                onClick={onDeleteAccountClick}>
                {isDeleteAccountLoading
                  ? "DELETING YOUR ACCOUNT..."
                  : "DELETE YOUR ACCOUNT"}
              </Button>
            </DeleteButtonContainer>
          </PageContentContainer>
        </Container>
      </AccountBase>
    </SettingsBase>
  );
};

const Container = styled.div`
  flex-direction: row;
  width: 100%;
`;

const ButtonContainer = styled.div`
  flex-direction: row;
`;

const DeleteButtonContainer = styled.div`
  flex-direction: row;
  justify-content: flex-end;
`;
