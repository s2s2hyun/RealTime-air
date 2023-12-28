import React, { Suspense, useRef } from "react";
import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Mask from "../3dobject/3dMask";

const Cover = () => (
  /* const ref = useRef();*/ <Wrapper>
    <Container>
      <p>공기</p>
    </Container>
    <CanvasContainer>
      <Canvas
        dpr={[0.5, 0.85]}
        orthographic
        camera={{ fov: 75, position: [0, 0, 15] }}
        style={{ background: "rgba(59,130,246,0)" }}
      >
        <Suspense fallback={null}>
          <Stage preset="soft" intensity={1} environment="warehouse">
            <Mask />
          </Stage>
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enableRotate={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </CanvasContainer>
  </Wrapper>
);

export default Cover;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: rgba(59, 130, 246, 0.7);
`;

const Container = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 30vh;
  /* position: relative; */
`;
