import React, { createContext, useCallback, useEffect, useState } from 'react';
import Script from 'next/script';

export const KakaoMapContext = createContext(null);

export const KakaoMapProvider = ({ children }) => {
  const [isLoadingSDK, setIsLoadingSDK] = useState(true);
  const [current, setCurrent] = useState(null);
  const [kakaoMap, setKakaoMap] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCurrent({ latitude: coords.latitude, longitude: coords.longitude });
    });
  }, []);

  const handleDrawMap = useCallback(
    (dom) => {
      if (isLoadingSDK || !dom || !current) return;

      new kakao.maps.load(() => {
        const options = {
          center: new kakao.maps.LatLng(current.latitude, current.longitude),
          level: 3,
        };

        setKakaoMap(new kakao.maps.Map(dom, options));
      });
    },
    [isLoadingSDK, current]
  );

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP}&autoload=false`}
        onLoad={() => setIsLoadingSDK(false)}
      />
      <KakaoMapContext.Provider value={{ isLoadingSDK, kakaoMap, handleDrawMap }}>{children}</KakaoMapContext.Provider>
    </>
  );
};
