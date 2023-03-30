import React, { createContext, useCallback, useState } from 'react';
import Script from 'next/script';

export const KakaoMapContext = createContext({ isLoading: true });

export const KakaoMapProvider = ({ children }) => {
  const [kakaoMapInfo, setKakaoMapInfo] = useState({ isLoading: true });

  const handleLoad = useCallback(() => setKakaoMapInfo((info) => ({ ...info, isLoading: false })), []);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP}&autoload=false`}
        onLoad={handleLoad}
      />
      <KakaoMapContext.Provider value={kakaoMapInfo}>{children}</KakaoMapContext.Provider>
    </>
  );
};
