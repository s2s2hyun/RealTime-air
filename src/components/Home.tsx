// import React, { useEffect, useState } from "react";
import { useCallback, useEffect, useState } from "react";
import useGeolocation from "../hook/useGeolocation";
import axios from "axios";

// interface StationItem {
//   tm: number;
//   addr: string;
//   stationName: string;
// }

const Home = () => {
  const public_key = import.meta.env.VITE_REALTIME_AIR_KEY;
  const kakao_key = import.meta.env.VITE_APP_KAKAO_KEY;
  const kakao_js_key = import.meta.env.VITE_APP_KAKAO_JS_KEY;
  const location = useGeolocation();
  const [address, setAddress] = useState<string>("");
  const [changeCoord, setChangeCoord] = useState({ x: 0, y: 0 });
  const [center, setCenter] = useState("");

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
        console.log(response);
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
    if (location.coordinates && !address) {
      fetchAddress(
        location.coordinates.lat,
        location.coordinates.lng,
        kakao_key
      );
    }
  }, [location, kakao_key, address, fetchAddress]);

  // console.log(location.coordinates.lat, typeof location.coordinates.lat);

  const response1 = axios
    .get(
      `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${location.coordinates.lng}&y=${location.coordinates.lat}&input_coord=WGS84&output_coord=TM`,
      {
        headers: {
          Authorization: "KakaoAK " + kakao_key,
        },
      }
    )
    .then((res) => {
      // console.log(res.data);
      const coordinatesData = res.data.documents[0];
      setChangeCoord({ x: coordinatesData.x, y: coordinatesData.y });
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(changeCoord, " changeCoord");

  // const reponse2 = axios
  //   .get(
  //     `http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=${changeCoord.x}&tmY=${changeCoord}&returnType=json&serviceKey=${public_key}`
  //   )
  //   .then((res) => {
  //     const items = res.data.response?.body.items;
  //     setCenter(items[0]?.stationName);
  //   })
  //   .catch((error) => console.log(error));

  // const response3 = axios
  //   .get(
  //     `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?dataTerm=month&pageNo=1&numOfRows=100&returnType=json&stationName=${center[0]}&serviceKey=${public_key}`
  //   )
  //   .then((res) => {
  //     console.log(res.data.response?.body.items);
  //   })
  //   .catch((error) => console.log(error));

  // console.log(reponse1?.data.response.body, " reponse1");
  // console.log(address, "address 는 현재 ");

  return (
    <div>
      {
        <>
          <p>{kakao_key}</p>
          <p>{kakao_js_key}</p>
          <p>{location.coordinates.lat}</p>
          <p>{location.coordinates.lng}</p>
          <p>{address}</p>
        </>
      }
    </div>
  );
};

export default Home;
