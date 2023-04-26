import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { KakaoMapContext } from '../KakaoMapProvider';

export const CurrentContext = createContext(null);

export const CurrentProvider = ({ children }) => {
  const { kakaoMap } = useContext(KakaoMapContext);
  const [current, setCurrent] = useState(null);

  const handleClickMap = useCallback((event) => {
    setCurrent(event.latLng);
  }, []);

  useEffect(() => {
    if (!kakaoMap) return;
    kakao.maps.event.addListener(kakaoMap, 'click', handleClickMap);

    return () => {
      kakao.maps.event.removeListener(kakaoMap, 'click', handleClickMap);
    };
  }, [kakaoMap, handleClickMap]);

  return <CurrentContext.Provider value={{ current, setCurrent }}>{children}</CurrentContext.Provider>;
};
