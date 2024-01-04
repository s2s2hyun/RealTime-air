// import React, { useEffect, useState } from "react";
import { useCallback, useEffect, useState } from "react";
import useGeolocation from "../../hook/useGeolocation";
import axios from "axios";
import styled from "@emotion/styled";
import AirPieChart from "../charts/Chart";

// interface StationItem {
//   tm: number;
//   addr: string;
//   stationName: string;
// }

interface Coordinates {
  x: number;
  y: number;
}

interface StyledBackgroundProps {
  condition: string;
}

const Home = () => {
  const public_key = import.meta.env.VITE_REALTIME_AIR_KEY;
  const kakao_key = import.meta.env.VITE_APP_KAKAO_KEY;
  // const kakao_js_key = import.meta.env.VITE_APP_KAKAO_JS_KEY;
  const location = useGeolocation();
  const [address, setAddress] = useState<string>("");
  const [changeCoord, setChangeCoord] = useState<Coordinates>({ x: 0, y: 0 });
  const [isCoordValid, setIsCoordValid] = useState<boolean>(false);
  const [center, setCenter] = useState<string>("");
  // 대기오염
  const [dusty, setDusty] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [gradeText, setGradeText] = useState<string>("");
  const [condition, setCondition] = useState<string>("");

  const [oz, setOz] = useState<string>(""); // 오존
  const [ozGrade, setOzGrade] = useState<string>(""); // 오존등급
  const [ozColor, setOzColor] = useState<string>("");
  const [ozGradeText, setOzGradeText] = useState<string>("");

  const [co, setCo] = useState<string>(""); // 일산화탄소
  const [coGrade, setCoGrade] = useState(""); // 일산화탄소등급
  const [coColor, setCoColor] = useState<string>("");
  const [coGradeText, setCoGradeText] = useState<string>("");

  const [so, setSo] = useState<string>(""); // 아황산가스
  const [soGrade, setSoGrade] = useState<string>(""); // 아황산가스등급
  const [soColor, setSoColor] = useState<string>("");
  const [soGradeText, setSoGradeText] = useState<string>("");

  const [no, setNo] = useState<string>(""); // 이산화질소
  const [noGrade, setNoGrade] = useState<string>(""); // 이산화질소등급
  const [noColor, setNoColor] = useState<string>("");
  const [noGradeText, setNoGradeText] = useState<string>("");

  const [khai, setKhai] = useState<string>(""); // 통합대기
  const [khaiGrade, setKhaiGrade] = useState<string>(""); // 통합대기환경지수등급
  const [khaiColor, setKhaiColor] = useState<string>("");
  const [khaiGradeText, setKhaiGradeText] = useState<string>("");

  const fetchAddress = useCallback(
    async (lat: number, lng: number, key: string) => {
      try {
        const response = await axios.get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&y=${lat}&x=${lng}`,
          {
            headers: {
              Authorization: `KakaoAK ${key}`,
            },
          }
        );
        const addressData = response.data.documents?.[0]?.address;
        // console.log(response);
        if (addressData) {
          setAddress(
            `${addressData.region_1depth_name} ${addressData.region_2depth_name} ${addressData.region_3depth_name}`
          );
        } else {
          console.log("No address data found");
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  useEffect(() => {
    if (
      location.coordinates &&
      location.coordinates.lat &&
      location.coordinates.lng
    ) {
      fetchAddress(
        location.coordinates.lat,
        location.coordinates.lng,
        kakao_key
      );

      axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${location.coordinates.lng}&y=${location.coordinates.lat}&input_coord=WGS84&output_coord=TM`,
          {
            headers: {
              Authorization: "KakaoAK " + kakao_key,
            },
          }
        )
        .then((res) => {
          const coordinatesData = res.data.documents[0];
          if (
            typeof coordinatesData.x === "number" &&
            typeof coordinatesData.y === "number"
          ) {
            setChangeCoord({ x: coordinatesData.x, y: coordinatesData.y });
            setIsCoordValid(true);
          } else {
            console.log("Invalid coordinates data");
            // 필요에 따라 여기에 기본값을 설정하거나 다른 처리를 할 수 있습니다.
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [location, kakao_key, fetchAddress]);

  console.log(changeCoord, " changeCoord");

  useEffect(() => {
    if (isCoordValid) {
      axios
        .get(
          `http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=${Number(
            changeCoord.x
          )}&tmY=${Number(changeCoord.y)}&returnType=json&serviceKey=${String(
            public_key
          )}`
        )
        .then((res) => {
          const items = res.data.response?.body.items;
          if (items && items.length > 0) {
            setCenter(items[0]?.stationName);
          } else {
            console.log("No station data found");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [changeCoord, public_key]);

  useEffect(() => {
    if (center) {
      axios
        .get(
          `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?dataTerm=month&pageNo=1&numOfRows=100&returnType=json&stationName=${center}&serviceKey=${public_key}`
        )
        .then((res) => {
          console.log(res.data.response?.body.items[0]);
          setCoGrade(res.data.response?.body.items[0].coGrade);
          setCo(res.data.response?.body.items[0].coValue);
          setKhaiGrade(res.data.response?.body.items[0].khaiGrade);
          setKhai(res.data.response?.body.items[0].khaiValue);
          setNoGrade(res.data.response?.body.items[0].no2Grade);
          setNo(res.data.response?.body.items[0].no2Value);
          setOzGrade(res.data.response?.body.items[0].o3Grade);
          setOz(res.data.response?.body.items[0].o3Value);
          setGrade(res.data.response?.body.items[0].pm10Grade);
          setDusty(res.data.response?.body.items[0].pm10Value);
          setSo(res.data.response?.body.items[0].so2Value);

          setSoGrade(res.data.response?.body.items[0].so2Grade);
        })
        .catch((error) => console.log(error));
    }
  }, [center, public_key]);

  console.log(soGrade, "soGrade 등급은? ");

  useEffect(() => {
    if (grade === "1") {
      setCondition("good");
      setGradeText("좋음");
    } else if (grade === "2") {
      setCondition("soso");
      setGradeText("보통");
    } else if (grade === "3") {
      setCondition("bad");
      setGradeText("나쁨");
    } else if (grade === "4") {
      setCondition("verybad");
      setGradeText("매우나쁨");
    } else {
      setCondition("");
      setGradeText("");
    }
  }, [grade]);

  useEffect(() => {
    if (ozGrade === "1") {
      setOzGradeText("좋음");
      setOzColor("#4f96f1");
    } else if (ozGrade === "2") {
      setOzGradeText("보통");
      setOzColor("#38d4ab");
    } else if (ozGrade === "3") {
      setOzGradeText("나쁨");
      setOzColor("#f3c083");
    } else if (ozGrade === "4") {
      setOzGradeText("매우나쁨");
      setOzColor("#f14c4c");
    } else {
      setOzGradeText("-");
      setOzColor("#4f96f1");
    }
  }, [ozGrade]);

  useEffect(() => {
    if (coGrade === "1") {
      setCoGradeText("좋음");
      setCoColor("#4f96f1");
    } else if (coGrade === "2") {
      setCoGradeText("보통");
      setCoColor("#38d4ab");
    } else if (coGrade === "3") {
      setCoGradeText("나쁨");
      setCoColor("#f3c083");
    } else if (coGrade === "4") {
      setCoGradeText("매우나쁨");
      setCoColor("#f14c4c");
    } else {
      setCoGradeText("-");
      setCoColor("#4f96f1");
    }
  }, [coGrade]);

  // useEffect(() => {
  //   if (ozGrade === "1") {
  //     setCoGradeText("좋음");
  //     setCoColor("#4f96f1");
  //   } else if (ozGrade === "2") {
  //     setCoGradeText("보통");
  //     setCoColor("#38d4ab");
  //   } else if (ozGrade === "3") {
  //     setCoGradeText("나쁨");
  //     setCoColor("#f3c083");
  //   } else if (ozGrade === "4") {
  //     setCoGradeText("매우나쁨");
  //     setCoColor("#f14c4c");
  //   } else {
  //     setCoGradeText("-");
  //     setCoColor("#4f96f1");
  //   }
  // }, [ozGrade]);

  useEffect(() => {
    if (soGrade === "1") {
      setSoGradeText("좋음");
      setSoColor("#4f96f1");
    } else if (soGrade === "2") {
      setSoGradeText("보통");
      setSoColor("#38d4ab");
    } else if (soGrade === "3") {
      setSoGradeText("나쁨");
      setSoColor("#f3c083");
    } else if (soGrade === "4") {
      setSoGradeText("매우나쁨");
      setSoColor("#f14c4c");
    } else {
      setSoGradeText("-");
      setSoColor("#4f96f1");
    }
  }, [soGrade]);

  useEffect(() => {
    if (noGrade === "1") {
      setNoGradeText("좋음");
      setNoColor("#4f96f1");
    } else if (noGrade === "2") {
      setNoGradeText("보통");
      setNoColor("#38d4ab");
    } else if (noGrade === "3") {
      setNoGradeText("나쁨");
      setNoColor("#f3c083");
    } else if (noGrade === "4") {
      setNoGradeText("매우나쁨");
      setNoColor("#f14c4c");
    } else {
      setNoGradeText("-");
      setNoColor("#4f96f1");
    }
  }, [noGrade]);

  useEffect(() => {
    if (khaiGrade === "1") {
      setKhaiGradeText("좋음");
      setKhaiColor("#4f96f1");
    } else if (khaiGrade === "2") {
      setKhaiGradeText("보통");
      setKhaiColor("#38d4ab");
    } else if (khaiGrade === "3") {
      setKhaiGradeText("나쁨");
      setKhaiColor("#f3c083");
    } else if (khaiGrade === "4") {
      setKhaiGradeText("매우나쁨");
      setKhaiColor("#f14c4c");
    } else {
      setKhaiGradeText("-");
      setKhaiColor("#4f96f1");
    }
  }, [khaiGrade]);

  return (
    <Wrapper>
      <VideoWrapper condition={condition}>
        <VideoBackground autoPlay loop muted playsInline>
          <source src="./dust.mp4" type="video/mp4" />
        </VideoBackground>
      </VideoWrapper>
      <InnerContainer>
        <TopContainer>
          <p>{address}</p>
          <br />
          <p>{dusty}</p>
          <br />
          <p>{gradeText}</p>
        </TopContainer>
        <BottomContainer>
          <div style={{ position: "relative" }}>
            <AirPieChart airtypeValue={co} airColor={coColor} />
            <ValueWrapper>
              <ValueText>{co}</ValueText>
              <ValueAirStatus>{coGradeText}</ValueAirStatus>
              <ValueAir>일산화탄소</ValueAir>
            </ValueWrapper>
          </div>
          <div style={{ position: "relative" }}>
            <AirPieChart airtypeValue={oz} airColor={ozColor} />
            <ValueWrapper>
              <ValueText>{oz}</ValueText>
              <ValueAirStatus>{ozGradeText}</ValueAirStatus>
              <ValueAir>오존</ValueAir>
            </ValueWrapper>
          </div>
          <div style={{ position: "relative" }}>
            <AirPieChart airtypeValue={so} airColor={soColor} />
            <ValueWrapper>
              <ValueText>{so}</ValueText>
              <ValueAirStatus>{soGradeText}</ValueAirStatus>
              <ValueAir>아황산가스</ValueAir>
            </ValueWrapper>
          </div>
          <div style={{ position: "relative" }}>
            <AirPieChart airtypeValue={no} airColor={noColor} />
            <ValueWrapper>
              <ValueText>{no}</ValueText>
              <ValueAirStatus>{noGradeText}</ValueAirStatus>
              <ValueAir>이산화질소등급</ValueAir>
            </ValueWrapper>
          </div>
          <div style={{ position: "relative" }}>
            <AirPieChart airtypeValue={khai} airColor={khaiColor} />
            <ValueWrapper>
              <ValueText>{khai}</ValueText>
              <ValueAirStatus>{khaiGradeText}</ValueAirStatus>
              <ValueAir>통합대기환경지수</ValueAir>
            </ValueWrapper>
          </div>
        </BottomContainer>
      </InnerContainer>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VideoWrapper = styled.div<StyledBackgroundProps>`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: ${(props) => {
    if (props.condition === "good") {
      return "linear-gradient(150deg, #6ad6e8, #1968ca)";
    } else if (props.condition === "soso") {
      return "linear-gradient(150deg, #26cda1, #045f80)";
    } else if (props.condition === "bad") {
      return "linear-gradient(150deg, #e8af6a, #823310)";
    } else if (props.condition === "verybad") {
      return "linear-gradient(150deg, #ed6262, #580331)";
    } else {
      return "none";
    }
  }};
`;
const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: opacity(0.08);
`;

const InnerContainer = styled.div`
  position: relative;
  max-width: 800px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopContainer = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 28px;
`;

const BottomContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const ValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateX(-12px);
`;

const ValueText = styled.p`
  transform: translateY(-85px);
`;

const ValueAir = styled.p`
  margin-top: 8px;
  font-weight: 400;
  color: #fff;
  font-size: 1.2rem;
`;

const ValueAirStatus = styled.p`
  margin-top: 8px;
  font-weight: 400;
  color: #fff;
  font-size: 1rem;
`;
