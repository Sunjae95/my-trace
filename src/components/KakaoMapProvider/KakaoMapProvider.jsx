import React, { createContext, useCallback, useState } from 'react';
import Script from 'next/script';

export const KakaoMapContext = createContext(null);

export const KakaoMapProvider = ({ children }) => {
  const [isLoadingSDK, setIsLoadingSDK] = useState(true);
  const [isLoadingMap, setIsLoadingMap] = useState(true);

  const handleDrawMap = useCallback(
    (dom) => {
      if (isLoadingSDK || !dom) return;

      new kakao.maps.load(() => {
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        new kakao.maps.Map(dom, options);
        setIsLoadingMap(false);
      });
    },
    [isLoadingSDK]
  );

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP}&autoload=false`}
        onLoad={() => setIsLoadingSDK(false)}
      />
      <KakaoMapContext.Provider value={{ isLoadingSDK, isLoadingMap, handleDrawMap }}>
        {children}
      </KakaoMapContext.Provider>
    </>
  );
};
