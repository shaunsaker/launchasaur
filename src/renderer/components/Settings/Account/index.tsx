import React, { ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteAccount, updateEmail } from "../../../store/auth/actions";
import { selectUser } from "../../../store/auth/selectors";
import { showConfirmationModal } from "../../../store/confirmationModal/actions";
import { validateEmail } from "../../../utils/validateEmail";
import { Button } from "../../Button";
import { MarginContainer } from "../../MarginContainer";
import { PageContentContainer } from "../../PageContentContainer";
import { PageTitleText } from "../../PageTitleText";
import { TextInput } from "../../TextInput";
import { SettingsBase } from "../SettingsBase";

export const Account = (): ReactElement => {
  // TODO: change password
  // TODO: reauthenticate before any of these actions
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [email, setEmail] = useState(user.email);
  const isEmailValid = validateEmail(email);
  const hasEmailChanged = email !== user.email;
  const isChangeEmailButtonDisabled = !hasEmailChanged || !isEmailValid;

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangeEmailClick = useCallback(() => {
    dispatch(updateEmail.request({ email }));
  }, [dispatch, email]);

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
