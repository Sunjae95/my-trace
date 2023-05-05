import React, { useContext, useEffect, useMemo, useRef } from 'react';

import { KakaoMapContext } from '@contexts';
import { useMarker } from '@hooks';

export const Map = ({ current }) => {
  const ref = useRef(null);
  const { kakaoMap, handleDrawMap } = useContext(KakaoMapContext);

  const { handleCreateMarker, handleRemoveClickEvent } = useMarker();

  const currentMarker = useMemo(() => {
    if (!current) return null;

    return handleCreateMarker({ latitude: current.Ma, longitude: current.La });
  }, [current, handleCreateMarker]);

  // NOTE 다른 마커 선택시 cleanUp 되는지 확인해볼 것
  useEffect(() => {
    if (!currentMarker) return;

    currentMarker.setMap(kakaoMap);
    return () => {
      currentMarker.setMap(null);
    };
  }, [currentMarker, kakaoMap, handleRemoveClickEvent]);

  useEffect(() => {
    handleDrawMap(ref.current);
  }, [handleDrawMap]);

  return (
    <div
      ref={ref}
      style={{ width: '80%', height: '400px' }}
    ></div>
  );
};
