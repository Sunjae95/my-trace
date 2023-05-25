import React, { useCallback, useEffect, useState } from 'react';

import { Information, Map } from '@components';
import { createMarkerAPI, getMarkerListAPI, updateMarkerAPI } from '@services';

const Home = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [current, setCurrent] = useState(null);
  const [markerList, setMarkerList] = useState([]);

  // API 관련 함수
  const fetchMarkerList = useCallback(async () => {
    const data = await getMarkerListAPI();
    setMarkerList(data);
  }, []);

  const createMarker = useCallback(
    async (option) => {
      try {
        await createMarkerAPI(option);
        await fetchMarkerList();
      } catch {
      } finally {
        setIsEditable(false);
      }
    },
    [fetchMarkerList]
  );

  const updateMarker = useCallback(
    async (id, option) => {
      try {
        await updateMarkerAPI(id, option);
        await fetchMarkerList();
      } catch {
      } finally {
        setIsEditable(false);
      }
    },
    [fetchMarkerList]
  );

  const handleDeleteMarker = useCallback(
    async (id) => {
      try {
        await deleteMarkerAPI(id);
        await fetchMarkerList();
        setCurrent(null);
      } catch {
      } finally {
      }
    },
    [fetchMarkerList]
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
        updateMarker(id, option);
        return;
      }

      createMarker(option);
    },
    [createMarker, updateMarker]
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
