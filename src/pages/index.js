import React, { useCallback, useContext, useEffect, useState } from 'react';

import { Information, Map } from '@components';
import { KakaoMapContext } from '@contexts';

const Home = () => {
  const [current, setCurrent] = useState(null);
  const { kakaoMap } = useContext(KakaoMapContext);

  const handleClickMap = useCallback((event) => setCurrent(event.latLng), []);

  useEffect(() => {
    if (!kakaoMap) return;

    kakao.maps.event.addListener(kakaoMap, 'click', handleClickMap);
    return () => {
      kakao.maps.event.removeListener(kakaoMap, 'click', handleClickMap);
    };
  }, [kakaoMap, handleClickMap]);

  return (
    <>
      <Map current={current} />
      <Information current={current} />
    </>
  );
};

export default Home;
