import React, { useContext, useEffect, useRef } from 'react';

import { KakaoMapContext } from '@components';
import { useMarker } from '@hooks';

const Home = () => {
  const ref = useRef(null);
  const { kakaoMap, handleDrawMap } = useContext(KakaoMapContext);
  const { handleSettingMarker } = useMarker();

  useEffect(() => {
    handleDrawMap(ref.current);
  }, [handleDrawMap]);

  useEffect(() => {
    if (!kakaoMap) return;

    handleSettingMarker([
      {
        title: '카카오',
        latlng: new kakao.maps.LatLng(33.450705, 126.570677),
      },
      {
        title: '생태연못',
        latlng: new kakao.maps.LatLng(33.450936, 126.569477),
      },
      {
        title: '텃밭',
        latlng: new kakao.maps.LatLng(33.450879, 126.56994),
      },
      {
        title: '근린공원',
        latlng: new kakao.maps.LatLng(33.451393, 126.570738),
      },
    ]);
  }, [kakaoMap, handleSettingMarker]);
  return (
    <main>
      <div
        ref={ref}
        style={{ width: '500px', height: '400px' }}
      ></div>
    </main>
  );
};

export default Home;
