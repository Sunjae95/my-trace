import React, { useCallback, useContext, useEffect, useState } from 'react';

import { Information, Map } from '@components';
import { KakaoMapContext } from '@contexts';

const Home = () => {
  const { kakaoMap } = useContext(KakaoMapContext);
  const [current, setCurrent] = useState(null);
  const [markerList, setMarkerList] = useState([]);

  const handleFetchMarkerList = useCallback(() => {
    setCurrent(null);
    const fetchedMarkerList = JSON.parse(localStorage.getItem('markerList')) ?? [];
    setMarkerList(fetchedMarkerList);
  }, []);

  useEffect(() => {
    handleFetchMarkerList();
  }, [handleFetchMarkerList]);

  // NOTE event.latLng.Ma !== marker.getPosition().getLat()
  const handleClickMap = useCallback(
    (event) =>
      setCurrent({
        title: null,
        latitude: event.latLng.Ma,
        longitude: event.latLng.La,
      }),
    []
  );
  useEffect(() => {
    if (!kakaoMap) return;

    kakao.maps.event.addListener(kakaoMap, 'click', handleClickMap);
    return () => {
      kakao.maps.event.removeListener(kakaoMap, 'click', handleClickMap);
    };
  }, [kakaoMap, handleClickMap]);

  return (
    <>
      <Map
        current={current}
        markerList={markerList}
        setCurrent={setCurrent}
      />
      <Information
        current={current}
        markerList={markerList}
        onFetchMarkerList={handleFetchMarkerList}
      />
    </>
  );
};

export default Home;
