import React, {
  ForwardedRef,
  forwardRef,
  ReactElement,
  useCallback,
} from "react";
// @ts-expect-error types exist
import Tippy, { Placement } from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away-subtle.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLastOnboardingCoachmark,
  selectNextOnboardingCoachmarkKey,
  selectOnboardingCoachmarkKey,
  selectShowOnboardingCoachmarks,
} from "../../store/onboarding/selectors";
import {
  OnboardingCoachmarkKey,
  ONBOARDING_ACTION_URL,
  ONBOARDING_CHARACTER,
  ONBOARDING_ENEMY,
  ONBOARDING_NEW_LAUNCHER_ICON,
  ONBOARDING_NEW_LAUNCHER_NAME,
  ONBOARDING_PLANET,
} from "../../store/onboarding/models";
import styled from "styled-components";
import {
  BORDER_RADIUS,
  BOX_SHADOW_CSS,
  RHYTHM,
  SMALL_BORDER_WIDTH,
  theme,
} from "../../theme";
import { Button } from "../Button";
import { MarginContainer } from "../MarginContainer";
import { OnboardingCoachmarkProgress } from "./OnboardingCoachmarkProgress";
import {
  hideOnboardingCoachmarks,
  setOnboardingCoachmarkKey,
} from "../../store/onboarding/actions";
import { LauncherAction } from "../../store/launchStations/models";
import { ParagraphText } from "../ParagraphText";

const getCoachmarkHtmlText = (
  onboardingCoachmarkKey: OnboardingCoachmarkKey,
) => {
  switch (onboardingCoachmarkKey) {
    case OnboardingCoachmarkKey.ShowLaunchStation:
      return `Welcome to your <b>${ONBOARDING_PLANET} Launch Station</b>.<br>Here you will find all of your Launchers that you can trigger to do amazing Launchjitsu™ 🥋`;

    case OnboardingCoachmarkKey.ShowLauncher:
      return `${ONBOARDING_CHARACTER} arrived here using this <b>Launcher</b> but it broke down during the landing 🪂<br>You can click it but it doesn't do anything, yet!`;

    case OnboardingCoachmarkKey.OpenControlPanel:
      return `Let's fix ${ONBOARDING_CHARACTER}'s broken Launcher by heading over to the <b>Control Panel</b> ⚙`;

    case OnboardingCoachmarkKey.ShowControlPanel:
      return `Welcome to your Control Panel.<br>Here you can configure your<br><b>Launch Stations</b> and <b>Launchers</b> 💻`;

    case OnboardingCoachmarkKey.OpenLauncherControlPanel:
      return `This is ${ONBOARDING_CHARACTER}'s <b>Broken Launcher</b>.<br>Let's fix it by clicking on <b>Edit</b>.`;

    case OnboardingCoachmarkKey.EditLauncherName:
      return `Welcome to the <b>Launcher Control Panel</b>.<br>Here you can configure your selected Launcher. Change the Launcher <b>name</b> to "${ONBOARDING_NEW_LAUNCHER_NAME}" 😉`;

    case OnboardingCoachmarkKey.EditLauncherIcon:
      return `Great, now let's change the <b>icon</b> to "${ONBOARDING_NEW_LAUNCHER_ICON}" 🚀`;

    case OnboardingCoachmarkKey.EditLauncherColour:
      return `Now let's change the <b>colour</b>!<br>How about a green for "Ready"? 🎨`;

    case OnboardingCoachmarkKey.EditLauncherActions:
      return `The last piece of the puzzle and perhaps the most important of all, the <b>Launcher Actions</b>.<br><br>Add an "${LauncherAction.OpenLink}" action with the following url:<br><br><u>${ONBOARDING_ACTION_URL}</u>`;

    case OnboardingCoachmarkKey.CloseLauncherControlPanel:
      return `Now click <b>Done</b> to head back to the Control Panel ✅`;

    case OnboardingCoachmarkKey.CloseControlPanel:
      return `Woohoo! Our Launcher is <b>ready</b>💪<br>Let's go back to the <b>Launch Station</b>.<br>Click on the Close icon.`;

    case OnboardingCoachmarkKey.TriggerLauncher:
      return `Let's get ${ONBOARDING_CHARACTER} the <b>hell out of here</b>!<br>Click on your "Fixed Launcher" to launch ${ONBOARDING_CHARACTER} into space and escape the ${ONBOARDING_ENEMY} 👽`;
  }
};

type Children = ReactElement;

interface OnboardingCoachmarkProps {
  shouldRender: (onboardingCoachmarkKey: OnboardingCoachmarkKey) => boolean;
  placement?: Placement;
  children: Children;
}

const ChildrenWithRef = forwardRef(
  ({ children }: { children: Children }, ref: ForwardedRef<HTMLDivElement>) => (
    <div ref={ref}>{children}</div>
  ),
);

export const OnboardingCoachmark = ({
  shouldRender,
  placement = "bottom",
  children,
}: OnboardingCoachmarkProps) => {
  const dispatch = useDispatch();
  const showOnboardingCoachmarks = useSelector(selectShowOnboardingCoachmarks);
  const onboardingCoachmarkKey = useSelector(selectOnboardingCoachmarkKey);
  const isLastOnboardingCoachmark = useSelector(
    selectIsLastOnboardingCoachmark,
  );
  const nextOnboardingCoachmarkKey = useSelector(
    selectNextOnboardingCoachmarkKey,
  );

  const onCoachmarkClick = useCallback(() => {
    if (isLastOnboardingCoachmark) {
      dispatch(hideOnboardingCoachmarks());
    } else {
      // set the next one
      dispatch(setOnboardingCoachmarkKey(nextOnboardingCoachmarkKey));
    }
  }, [dispatch, nextOnboardingCoachmarkKey, isLastOnboardingCoachmark]);

  const renderContent = useCallback(() => {
    return (
      <CoachmarkContentContainer>
        <MarginContainer small>
          <ParagraphText
            dangerouslySetInnerHTML={{
              __html: getCoachmarkHtmlText(onboardingCoachmarkKey),
            }}
          />
        </MarginContainer>

        <CoachmarkFooterContainer>
          <OnboardingCoachmarkProgressContainer>
            <OnboardingCoachmarkProgress />
          </OnboardingCoachmarkProgressContainer>

          <Button primary onClick={onCoachmarkClick}>
            OK
          </Button>
        </CoachmarkFooterContainer>
      </CoachmarkContentContainer>
    );
  }, [onboardingCoachmarkKey, onCoachmarkClick]);

  // if we're not meant to render the coachmark, just return the children as normal
  if (!showOnboardingCoachmarks || !shouldRender(onboardingCoachmarkKey)) {
    return children;
  }

  const content = renderContent();

  return (
    <StyledTippy
      content={content}
      visible
      interactive
      placement={placement}
      popperOptions={{ strategy: "fixed" }}
      animation="shift-away-subtle">
      <ChildrenWithRef>{children}</ChildrenWithRef>
    </StyledTippy>
  );
};

const StyledTippy = styled(Tippy)`
  &.tippy-box {
    background-color: ${theme.backgroundLightOpaque};
    border: ${SMALL_BORDER_WIDTH}px solid ${theme.black};
    border-radius: ${BORDER_RADIUS}px;
    ${BOX_SHADOW_CSS};
  }

  & .tippy-content {
    padding: ${RHYTHM}px;
  }

  & .tippy-arrow {
    color: ${theme.black};
  }
`;

const CoachmarkContentContainer = styled.div``;

const CoachmarkFooterContainer = styled.div`
  flex-direction: row;
  justify-content: space-between;
`;

const OnboardingCoachmarkProgressContainer = styled.div`
  flex: 1;
  margin-right: ${RHYTHM}px;
`;
