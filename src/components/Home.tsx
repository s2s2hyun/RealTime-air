import React, { useEffect, useState } from "react";

interface LocationProps {
  location: {
    latitude: number;
    longitude: number;
  };
}

const Home = () => {
  const [location, setLocation] = useState<LocationProps["location"]>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    let watchId: number | null = null;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 1000,
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div>
      <p>{location.latitude}</p>
      <p>{location.longitude}</p>
    </div>
  );
};

export default Home;
