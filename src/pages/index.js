import React, { useCallback, useEffect, useState } from 'react';

import { Information, Map } from '@components';
import { createMarkerAPI, deleteMarkerAPI, getMarkerListAPI, updateMarkerAPI } from '@services';
import { useUserInfo } from '@hooks';

const Home = () => {
  const { userInfo } = useUserInfo();

  const [isEditable, setIsEditable] = useState(false);
  const [current, setCurrent] = useState(null);
  const [markerList, setMarkerList] = useState([]);

  // API 관련 함수
  const fetchMarkerList = useCallback(async () => {
    if (!userInfo) return;

    const data = await getMarkerListAPI(userInfo.id);
    setMarkerList(data);
  }, [userInfo]);

  const handleCreateMarker = useCallback(
    async (option) => {
      try {
        const { id } = await createMarkerAPI({ ...option, userId: userInfo.id });
        await fetchMarkerList();
        setCurrent((value) => ({ ...value, id }));
      } catch {
      } finally {
        setIsEditable(false);
      }
    },
    [userInfo, fetchMarkerList]
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
    if (!e.target) return;

    const { value } = e.target;

    setCurrent((current) => ({ ...current, title: value }));
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
