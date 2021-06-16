import React, { ReactElement } from "react";
import styled from "styled-components";
import { CONTENT_CONTAINER_WIDTH } from "../theme";
import { BlankState } from "./BlankState";
import { Page } from "./Page";
import { PageContentContainer } from "./PageContentContainer";

export const ErrorPage = (): ReactElement => {
  return (
    <Page>
      <Container>
        <BlankState
          icon="exclamation"
          title="Uh Oh!"
          description="We're not sure how you got here but if the issue persists, please contact Support."
        />
      </Container>
    </Page>
  );
};

const Container = styled(PageContentContainer)`
  width: ${CONTENT_CONTAINER_WIDTH}px;
  align-self: center;
  justify-content: center;
`;
