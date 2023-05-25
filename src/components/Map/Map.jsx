import React, { memo, useContext, useEffect, useMemo, useRef } from 'react';

import { KakaoMapContext } from '@contexts';
import { useMarker } from '@hooks';
import { useCallback } from 'react';

export const Map = memo(({ current, markerList, onClickMarker }) => {
  const ref = useRef(null);
  const { kakaoMap, handleDrawMap } = useContext(KakaoMapContext);

  const { handleCreateMarker, handleAddClickEvent, handleRemoveClickEvent } = useMarker();

  // Current Marker
  const currentMarker = useMemo(() => {
    if (!current) return null;

    const { latitude, longitude } = current;
    return handleCreateMarker({ latitude, longitude });
  }, [current, handleCreateMarker]);

  // NOTE 다른 마커 선택시 cleanUp 되는지 확인해볼 것
  useEffect(() => {
    if (!currentMarker) return;

    currentMarker.setMap(kakaoMap);
    return () => {
      currentMarker.setMap(null);
    };
  }, [currentMarker, kakaoMap, handleRemoveClickEvent]);

  /**
   * @note 이벤트바인딩할 때 새로운 kakao Marker가 필요하므로 비즈니스로직을 태우기위해 변수선언
   */
  const markers = useMemo(() => {
    if (markerList.length === 0) return [];

    return markerList.map(({ latitude, longitude, ...option }) => {
      const marker = handleCreateMarker({ latitude, longitude });

      return { marker, ...option };
    });
  }, [markerList, handleCreateMarker]);

  useEffect(() => {
    if (!kakaoMap || markers.length === 0) return;
    markers.forEach(({ marker, ...option }) => {
      marker.setMap(kakaoMap);
      const position = marker.getPosition();
      handleAddClickEvent(marker, () =>
        onClickMarker({ latitude: position.getLat(), longitude: position.getLng(), ...option })
      );
    });

    return () => {
      markers.forEach(({ marker, ...option }) => {
        const position = marker.getPosition();
        handleRemoveClickEvent(marker, () =>
          onClickMarker({ latitude: position.getLat(), longitude: position.getLng(), ...option })
        );
        marker.setMap(null);
      });
    };
  }, [kakaoMap, markers, handleAddClickEvent, handleRemoveClickEvent, onClickMarker]);

  // NOTE Map Event Bind
  const clickMap = useCallback(
    (event) => {
      onClickMarker({ id: null, title: '', latitude: event.latLng.getLat(), longitude: event.latLng.getLng() });
    },
    [onClickMarker]
  );

  useEffect(() => {
    if (!kakaoMap) return;

    kakao.maps.event.addListener(kakaoMap, 'click', clickMap);
    return () => {
      kakao.maps.event.removeListener(kakaoMap, 'click', clickMap);
    };
  }, [kakaoMap, clickMap]);

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
