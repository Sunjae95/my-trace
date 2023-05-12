import React, { useCallback, useContext, useEffect, useState } from 'react';

import { Information, Map } from '@components';
import { KakaoMapContext } from '@contexts';

const Home = () => {
  const { kakaoMap } = useContext(KakaoMapContext);
  const [isEditable, setIsEditable] = useState(false);
  const [current, setCurrent] = useState(null);
  const [markerList, setMarkerList] = useState([]);

  // NOTE Data Fetching
  const getMarkerListFromStorage = useCallback(() => {
    const fetchedMarkerList = JSON.parse(localStorage.getItem('markerList')) ?? [];
    setMarkerList(fetchedMarkerList);
  }, []);

  const setMarkerListFromStorage = useCallback(
    (marker) => localStorage.setItem('markerList', JSON.stringify(marker)),
    []
  );

  useEffect(() => {
    getMarkerListFromStorage();
  }, [getMarkerListFromStorage]);

  // NOTE Map Event Bind
  const clickMap = useCallback((event) => {
    setIsEditable(false);
    setCurrent({
      title: '',
      latitude: event.latLng.getLat(),
      longitude: event.latLng.getLng(),
    });
  }, []);

  useEffect(() => {
    if (!kakaoMap) return;

    kakao.maps.event.addListener(kakaoMap, 'click', clickMap);
    return () => {
      kakao.maps.event.removeListener(kakaoMap, 'click', clickMap);
    };
  }, [kakaoMap, clickMap]);

  const handleClickMarker = useCallback((marker) => {
    setIsEditable(false);
    setCurrent(marker);
  }, []);

  const handleChangeEditable = useCallback(() => setIsEditable((isEditable) => !isEditable), []);

  const handleChangeCurrentTitle = useCallback((e) => {
    setCurrent((current) => ({ ...current, title: e.target.value }));
  }, []);

  const handleUpdateMarkerList = useCallback(
    (marker) => {
      const isDuplicate = markerList.some(
        ({ latitude, longitude }) => latitude === marker.latitude && longitude === marker.longitude
      );
      const updatedMarkerList = isDuplicate
        ? markerList.map(({ title, latitude, longitude }) =>
            latitude === marker.latitude && longitude === marker.longitude ? marker : { title, latitude, longitude }
          )
        : [...markerList, marker];

      setMarkerListFromStorage(updatedMarkerList);
      getMarkerListFromStorage();
      setIsEditable(false);
      setCurrent(marker);
    },
    [markerList, getMarkerListFromStorage, setMarkerListFromStorage]
  );

  const handleDeleteMarker = useCallback(
    (marker) => {
      const removedMarkerList = markerList.filter(
        ({ latitude, longitude }) => !(latitude === marker.latitude && longitude === marker.longitude)
      );
      setMarkerListFromStorage(removedMarkerList);
      getMarkerListFromStorage();
      setIsEditable(false);
      setCurrent(null);
    },
    [markerList, getMarkerListFromStorage, setMarkerListFromStorage]
  );

  return (
    <>
      <Map
        current={current}
        markerList={markerList}
        onClickMarker={handleClickMarker}
      />
      <Information
        isEditable={isEditable}
        onChangeEditable={handleChangeEditable}
        current={current}
        onChangeCurrentTitle={handleChangeCurrentTitle}
        onUpdateMarkerList={handleUpdateMarkerList}
        onDeleteMarker={handleDeleteMarker}
      />
    </>
  );
};

export default Home;
