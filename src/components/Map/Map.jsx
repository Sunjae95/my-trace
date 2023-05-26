/* eslint-disable no-undef */
import React, { memo, useContext, useEffect, useRef } from 'react';

import { KakaoMapContext } from '@contexts';
import { useMarker } from '@hooks';

export const Map = memo(({ current, markerList, onClickMarker }) => {
  const ref = useRef(null);
  const { kakaoMap, handleDrawMap } = useContext(KakaoMapContext);

  const { handleCreateMarker, handleAddClickEvent, handleRemoveClickEvent } = useMarker();

  useEffect(() => {
    if (!current || current.id) return;

    const currentMarker = handleCreateMarker({ latitude: current.latitude, longitude: current.longitude });
    currentMarker.setMap(kakaoMap);

    return () => {
      currentMarker.setMap(null);
    };
  }, [current, kakaoMap, handleCreateMarker]);

  /**
   * @note 이벤트바인딩할 때 새로운 kakao Marker가 필요하므로 비즈니스로직을 태우기위해 변수선언
   */
  useEffect(() => {
    if (!kakaoMap || markerList.length === 0) return;

    const markers = markerList.map(({ latitude, longitude, ...option }) => ({
      ...option,
      marker: handleCreateMarker({ latitude, longitude }),
    }));

    markers.forEach(({ marker, ...option }) => {
      const position = marker.getPosition();

      handleAddClickEvent(marker, () =>
        onClickMarker({ ...option, latitude: position.getLat(), longitude: position.getLng() })
      );
      marker.setMap(kakaoMap);
    });

    return () => {
      markers.forEach(({ marker, ...option }) => {
        const position = marker.getPosition();

        handleRemoveClickEvent(marker, () =>
          onClickMarker({ ...option, latitude: position.getLat(), longitude: position.getLng() })
        );
        marker.setMap(null);
      });
    };
  }, [kakaoMap, markerList, handleCreateMarker, handleAddClickEvent, handleRemoveClickEvent, onClickMarker]);

  useEffect(() => {
    if (!kakaoMap) return;

    const handleClickMap = ({ latLng }) =>
      onClickMarker({ id: null, title: '', latitude: latLng.getLat(), longitude: latLng.getLng() });

    kakao.maps.event.addListener(kakaoMap, 'click', handleClickMap);

    return () => {
      kakao.maps.event.removeListener(kakaoMap, 'click', handleClickMap);
    };
  }, [kakaoMap, onClickMarker]);

  useEffect(() => {
    handleDrawMap(ref.current);
  }, [handleDrawMap]);

  return (
    <div
      ref={ref}
      style={{ width: '80%', height: '400px' }}
    ></div>
  );
});
