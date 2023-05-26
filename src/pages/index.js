import React, { useCallback, useEffect, useState } from 'react';

import { Information, Map } from '@components';
import { createMarkerAPI, deleteMarkerAPI, getMarkerListAPI, updateMarkerAPI } from '@services';

const Home = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [current, setCurrent] = useState(null);
  const [markerList, setMarkerList] = useState([]);

  // API 관련 함수
  const fetchMarkerList = useCallback(async () => {
    const data = await getMarkerListAPI();
    setMarkerList(data);
  }, []);

  const handleCreateMarker = useCallback(
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

  const handleUpdateMarker = useCallback(
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

  // NOTE Client
  const handleClickMarker = useCallback((marker) => {
    setIsEditable(false);
    setCurrent(marker);
  }, []);

  const handleChangeEditable = useCallback(() => setIsEditable((isEditable) => !isEditable), []);

  const handleChangeCurrentTitle = useCallback((e) => {
    setCurrent((current) => ({ ...current, title: e.target.value }));
  }, []);

  useEffect(() => {
    fetchMarkerList();
  }, [fetchMarkerList]);

  return (
    <>
      <Map
        current={current}
        markerList={markerList}
        onClickMarker={handleClickMarker}
      />
      <Information
        isEditable={isEditable}
        current={current}
        onChangeEditable={handleChangeEditable}
        onChangeCurrentTitle={handleChangeCurrentTitle}
        onCreateMarker={handleCreateMarker}
        onUpdateMarker={handleUpdateMarker}
        onDeleteMarker={handleDeleteMarker}
      />
    </>
  );
};

export default Home;
