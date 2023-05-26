/* eslint-disable no-undef */
import React, { createContext, useCallback, useState } from 'react';
import Script from 'next/script';

export const KakaoMapContext = createContext(null);

export const KakaoMapProvider = ({ children }) => {
  const [isLoadingSDK, setIsLoadingSDK] = useState(true);
  const [kakaoMap, setKakaoMap] = useState(null);

  const handleDrawMap = useCallback(
    (dom) => {
      if (isLoadingSDK || !dom) return;

      new kakao.maps.load(() => {
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new kakao.maps.Map(dom, options);

        setKakaoMap(map);
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
      <KakaoMapContext.Provider value={{ isLoadingSDK, kakaoMap, handleDrawMap }}>{children}</KakaoMapContext.Provider>
    </>
  );
};
