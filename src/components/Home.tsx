// import React, { useEffect, useState } from "react";
import { useCallback, useEffect, useState } from "react";
import useGeolocation from "../hook/useGeolocation";
import axios from "axios";

// interface StationItem {
//   tm: number;
//   addr: string;
//   stationName: string;
// }

interface Coordinates {
  x: number;
  y: number;
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
  const [oz, setOz] = useState<string>(""); // 오존
  const [ozGrade, setOzGrade] = useState<string>(""); // 오존등급

  const [co, setCo] = useState<string>(""); // 일산화탄소
  const [coGrade, setCoGrade] = useState(""); // 일산화탄소등급

  const [so, setSo] = useState<string>(""); // 아황산가스
  const [soGrade, setSoGrade] = useState<string>(""); // 아황산가스등급

  const [no, setNo] = useState<string>(""); // 이산화질소
  const [noGrade, setNoGrade] = useState<string>(""); // 이산화질소등급

  const [khai, setKhai] = useState<string>(""); // 통합대기
  const [khaiGrade, setKhaiGrade] = useState<string>(""); // 통합대기등급

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
          console.log(
            res.data.response?.body.items[0].coGrade,
            "coGrade 이산화탄소등급"
          );
          setCo(res.data.response?.body.items[0].coValue);
          console.log(
            res.data.response?.body.items[0].coValue,
            "coValue 이산화탄소등급"
          );
          setKhaiGrade(res.data.response?.body.items[0].khaiGrade);
          console.log(
            res.data.response?.body.items[0].khaiGrade,
            "khaiGrade 통합대기 등급"
          );
          console.log(
            res.data.response?.body.items[0].khaiValue,
            "khaiValue 통합대기"
          );
          setKhai(res.data.response?.body.items[0].khaiValue);
          setNoGrade(res.data.response?.body.items[0].no2Grade);
          console.log(
            res.data.response?.body.items[0].no2Grade,
            "no2Grade 이산화질소등급"
          );
          console.log(
            res.data.response?.body.items[0].no2Value,
            "no2Value 이산화질소"
          );
          setNo(res.data.response?.body.items[0].no2Value);
          setOzGrade(res.data.response?.body.items[0].o3Grade);
          console.log(
            res.data.response?.body.items[0].o3Grade,
            "o3Grade 오존등급"
          );
          console.log(res.data.response?.body.items[0].o3Value, "o3Value 오존");
          setOz(res.data.response?.body.items[0].o3Value);
          setGrade(res.data.response?.body.items[0].pm10Grade);
          console.log(
            res.data.response?.body.items[0].pm10Grade,
            "pm10Grade 미세먼지등급"
          );
          setDusty(res.data.response?.body.items[0].pm10Value);
          console.log(
            res.data.response?.body.items[0].pm10Value,
            "pm10Value 미세먼지"
          );
          console.log(
            res.data.response?.body.items[0].so2Grade,
            "so2Grade 아황산가스"
          );
          setSo(res.data.response?.body.items[0].so2Grade);
          console.log(
            res.data.response?.body.items[0].so2Value,
            "so2Value 아황산가스등급"
          );
          setSoGrade(res.data.response?.body.items[0].so2Value);
        })
        .catch((error) => console.log(error));
    }
  }, [center, public_key]);

  console.log(center, "center");

  return (
    <div>
      {
        <>
          <p>{location.coordinates.lat}</p>
          <p>{location.coordinates.lng}</p>
          <p>{changeCoord.x}</p>
          <p>{changeCoord.y}</p>
          <p>
            {center}
            {"center"}
          </p>
          <p>{address}</p>
        </>
      }
    </div>
  );
};

export default Home;
