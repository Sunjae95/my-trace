import React, { memo, useContext, useEffect, useRef } from 'react';

import { KakaoMapContext } from '@contexts';
import { useMarker } from '@hooks';

export const Map = memo(({ current, markerList, onClickMarker }) => {
  const ref = useRef(null);
  const { kakaoMap, handleDrawMap } = useContext(KakaoMapContext);

  const { handleCreateMarker, handleAddClickEvent, handleRemoveClickEvent } = useMarker();

  // NOTE 생성되지 않는 marker paint
  // TODO title 상태분리할 것
  useEffect(() => {
    if (!current || current.id) return;

    const currentMarker = handleCreateMarker({ latitude: current.latitude, longitude: current.longitude });
    currentMarker.setMap(kakaoMap);

    return () => {
      currentMarker.setMap(null);
    };
  }, [current, kakaoMap, handleCreateMarker]);

  // NOTE 이미 생성된 markerList paint
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

  // NOTE 지도 click event bind
  useEffect(() => {
    if (!kakaoMap) return;

    const handleClickMap = ({ latLng }) =>
      onClickMarker({ id: null, title: '', latitude: latLng.getLat(), longitude: latLng.getLng() });

    kakao.maps.event.addListener(kakaoMap, 'click', handleClickMap);

    return () => {
      kakao.maps.event.removeListener(kakaoMap, 'click', handleClickMap);
    };
  }, [kakaoMap, onClickMarker]);

  // NOTE 지도 draw
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
