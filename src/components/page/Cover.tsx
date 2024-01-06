import { Suspense } from "react";
import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Mask from "../3dobject/3dMask";
import { useNavigate } from "react-router-dom";
// import useProgressBar from "../../hook/useProgress";

// interface StyledProps {
//   isComplete: boolean;
// }

export default function Cover() {
  const navigate = useNavigate();
  // const [isComplete, setIsComplete] = useState<boolean>(false);
  // const progress = useProgressBar(1500, 150);

  // useEffect(() => {
  //   if (progress >= 100) {
  //     setTimeout(() => {
  //       setIsComplete(true);
  //     }, 100);
  //   }
  // }, [progress]);

  const handleButtonClick = () => {
    navigate("/home"); // "/home" 경로로 라우팅
  };

  return (
    <Wrapper>
      {/* <ProgressWarpper isComplete={isComplete}>
        <p>진행 상태: {Math.round(progress)}%</p>
      </ProgressWarpper> */}
      <Container>
        <CoverTitle>현재 내가 있는곳에 대기 상태는?</CoverTitle>
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
      <ButtonContainer>
        <SButton onClick={handleButtonClick}>확인</SButton>
      </ButtonContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: rgba(59, 130, 246, 0.7);
`;

const Container = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoverTitle = styled.h2`
  font-size: 3.2em;
  font-weight: 700;
  color: #fff;

  @media (max-width: 1200px) {
    font-size: 3em;
  }

  @media (max-width: 992px) {
    font-size: 2.6em;
  }

  @media (max-width: 768px) {
    font-size: 2.2em;
  }

  @media (max-width: 576px) {
    font-size: 1.8em;
  }
  @media (max-width: 480px) {
    font-size: 1.6em;
  }
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 40vh;
  @media (max-width: 576px) {
    height: 30vh;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SButton = styled.button`
  width: 175px;
  height: 92px;
  flex-shrink: 0;
  color: #000;
  font-size: 1.4rem;
  font-weight: 500;
  border-radius: 16px;
  border: 2px solid #000;
  cursor: pointer;
  background: linear-gradient(270deg, #fff 50%, #000 50%);
  background-size: 200% 100%;
  background-position: right bottom;
  transition: background-position 0.5s;

  &:hover {
    border: 2px solid #000;

    background-position: left bottom;
    color: #fff;
  }
`;

// const ProgressWarpper = styled.div<StyledProps>`
//   display: ${(props) => (props.isComplete ? "none" : "flex")};
//   justify-content: center;
//   align-items: center;
//   position: fixed; // 전체 화면에 고정
//   top: 0;
//   left: 0;
//   z-index: 9999; // 다른 요소들 위에 표시
//   width: 100%;
//   height: 100vh; // 뷰포트 높이만큼 화면을 덮음
//   background-color: rgba(59, 130, 246, 1); // 반투명 배경색
// `;
