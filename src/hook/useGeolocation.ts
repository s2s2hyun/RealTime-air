import { useState, useEffect } from "react";

interface LocationStateType {
  loaded: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  error?: GeolocationPositionError | { code?: number; message?: string };
}

export default function useGeolocation() {
  const [location, setLocation] = useState<LocationStateType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });

  // 성공에 대한 로직
  const onSuccess = (location: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  // 에러에 대한 로직
  const onError = (error: GeolocationPositionError) => {
    setLocation({
      loaded: true,
      coordinates: { lat: 0, lng: 0 }, // 기본 좌표값 추가
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      // navigator.geolocation이 없는 경우, 사용자 정의 오류 처리
      setLocation({
        loaded: true,
        coordinates: { lat: 0, lng: 0 },
        error: {
          code: 0, // 사용자 정의 코드
          message: "Geolocation not supported", // 사용자 정의 오류 메시지
        },
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return location;
}
