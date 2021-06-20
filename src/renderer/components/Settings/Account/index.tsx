import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteAccount } from "../../../store/auth/actions";
import { showConfirmationModal } from "../../../store/confirmationModal/actions";
import { Button } from "../../Button";
import { MarginContainer } from "../../MarginContainer";
import { PageContentContainer } from "../../PageContentContainer";
import { PageTitleText } from "../../PageTitleText";
import { SettingsBase } from "../SettingsBase";

interface AccountProps {}

export const Account = ({}: AccountProps): ReactElement => {
  // TODO: change email
  // TODO: reset password
  // TODO: reauthenticate before any of these actions
  const dispatch = useDispatch();

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

const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
