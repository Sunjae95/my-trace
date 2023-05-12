import React, { memo, useContext, useEffect, useMemo, useRef } from 'react';

import { KakaoMapContext } from '@contexts';
import { useMarker } from '@hooks';

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

  // Marker List
  const markers = useMemo(() => {
    if (markerList.length === 0) return [];

    return markerList.map(({ title, latitude, longitude }) => {
      const marker = handleCreateMarker({ latitude, longitude });

      return { title: title, marker };
    });
  }, [markerList, handleCreateMarker]);

  useEffect(() => {
    if (!kakaoMap || markers.length === 0) return;
    markers.forEach(({ title, marker }) => {
      marker.setMap(kakaoMap);
      const position = marker.getPosition();
      handleAddClickEvent(marker, () =>
        onClickMarker({ title, latitude: position.getLat(), longitude: position.getLng() })
      );
    });

    return () => {
      markers.forEach(({ title, marker }) => {
        const position = marker.getPosition();
        handleRemoveClickEvent(marker, () =>
          onClickMarker({ title, latitude: position.getLat(), longitude: position.getLng() })
        );
        marker.setMap(null);
      });
    };
  }, [kakaoMap, markers, handleAddClickEvent, handleRemoveClickEvent, onClickMarker]);

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
