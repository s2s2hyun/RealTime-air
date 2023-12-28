import React, { Suspense, useRef } from "react";
import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Mask from "../3dobject/3dMask";

const Cover = () => {
  const ref = useRef();

  return (
    <Wrapper>
      <Canvas orthographic camera={{ fov: 75, position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stage
            controls={ref}
            // preset="portrait"
            intensity={1}
            environment="city"
          >
            <Mask />
          </Stage>
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enableRotate={false}
          enablePan={false}
          autoRotate
        />
      </Canvas>
    </Wrapper>
  );
};

export default Cover;

const Wrapper = styled.div`
  width: 100%;
  height: 50vh;
  position: relative;
`;
