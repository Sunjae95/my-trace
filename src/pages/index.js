import React, { useCallback, useEffect, useState } from 'react';

import { Information, Map } from '@components';
import { getMarkerListAPI, updateMarkerAPI } from '@services';

const Home = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [current, setCurrent] = useState(null);
  const [markerList, setMarkerList] = useState([]);

  // API 관련 함수
  const fetchMarkerList = useCallback(async () => {
    const data = await getMarkerListAPI();
    setMarkerList(data);
  }, []);

  const updateMarker = useCallback(
    async (id, option) => {
      try {
        await updateMarkerAPI(id, option);
        await fetchMarkerList();
        setIsEditable(false);
      } catch {}
    },
    [fetchMarkerList]
  );

  const setMarkerListFromStorage = useCallback(
    (marker) => localStorage.setItem('markerList', JSON.stringify(marker)),
    []
  );

  useEffect(() => {
    fetchMarkerList();
  }, [fetchMarkerList]);

  const handleClickMarker = useCallback((marker) => {
    setIsEditable(false);
    setCurrent(marker);
  }, []);

  // NOTE Client
  const handleChangeEditable = useCallback(() => setIsEditable((isEditable) => !isEditable), []);

  const handleChangeCurrentTitle = useCallback((e) => {
    setCurrent((current) => ({ ...current, title: e.target.value }));
  }, []);

  const handleUpdateMarkerList = useCallback(
    (marker) => {
      const { id, ...option } = marker;
      if (id) {
        // 수정
        updateMarker(id, option);
      } else {
        // 생성
      }
    },
    [updateMarker]
  );

  const handleDeleteMarker = useCallback(
    (marker) => {
      const removedMarkerList = markerList.filter(
        ({ latitude, longitude }) => !(latitude === marker.latitude && longitude === marker.longitude)
      );
      setMarkerListFromStorage(removedMarkerList);
      fetchMarkerList();
      setIsEditable(false);
      setCurrent(null);
    },
    [markerList, fetchMarkerList, setMarkerListFromStorage]
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
