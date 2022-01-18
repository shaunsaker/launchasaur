import React, { ReactElement, useEffect, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import SpaceTravel from "space-travel"; // eslint-disable-line
import { useSelector } from "react-redux";
import {
  selectStarsMoveFast,
  selectStarsMoveMedium,
} from "../../store/stars/selectors";

export const Stars = (): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>();

  const sceneRef = useRef<any>();

  const starsMoveMedium = useSelector(selectStarsMoveMedium);

  const starsMoveFast = useSelector(selectStarsMoveFast);

  useLayoutEffect(() => {
    // on mount, create and start the space travel animation

    sceneRef.current = new SpaceTravel({
      canvas: canvasRef.current,
    });

    sceneRef.current.start();
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      if (starsMoveFast) {
        sceneRef.current.throttle = 1;

        return;
      }

      if (starsMoveMedium) {
        sceneRef.current.throttle = 0.33;

        return;
      }

      // stars move slow
      sceneRef.current.throttle = 0;
    }
  }, [starsMoveMedium, starsMoveFast]);

  return <Container ref={canvasRef} />;
};

const Container = styled.canvas`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
`;
